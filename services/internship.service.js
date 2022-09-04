import dbConnect from "../database/dbconnect";
import Intern from "../database/internshipSchema";
import Teacher from "../database/teacherSchema";
import cryptoJs from "crypto-js";
import jwt from 'jsonwebtoken';
import Application from "../database/applicationSchema";

dbConnect();

module.exports = {
    getInternships,
    create,
    getInternById,
    update,
    deleteInternById
};

//Get All Internships
//TODO Update this to include only Posted Internships
async function getInternships()
{
    return await Intern.find();
}

// Create the Internship and add it's existence to creators doc.
async function create(user,body)
{
    if(user.type=="Student")
    throw "You are not Authorized to make a posting";
    body.postedby=user.id;
    const intern = await Intern.create(body);

    //Add the Internship id to document of the creator
    let teacher=await Teacher.findOne({_id: user.id});
    let update= teacher.internships;
    update.push(intern._id);
    await teacher.updateOne({internships:update});

    return intern;
}

//Get Internship by it's id
async function getInternById(user,internId)
{
    
    const intern = await Intern.findOne({_id: internId});
    if(!intern)
    throw("Internship Not Found");
    else if(intern.isPosted==false&&user.id!=intern.postedby&&!user.isAdmin)
    throw "You are not Authorized";
    return intern;
}

//Update the Internship after validating user
async function update(user,intern_id,body)
{
    let intern = await Intern.findOne({_id: intern_id});
    if(!intern)
    throw "Internship Not Found";
    if(user.isAdmin==false&&user.id!=intern.postedby)
    throw "You are not Authorized to Change this Internship";
    let {postedby,_id, ...update}=body;
    await intern.updateOne(update);
    intern = await Intern.findOne({_id: intern_id});
    return intern;
}


//Delete the internship and it's reference from teachers document
async function deleteInternById(user,internId)
{
    let intern=await Intern.findOne({_id: internId});
    if(!intern)
    throw "Internship Not Found";
    else if(user.isAdmin==false&&user.id!=intern.postedby)
    throw "You are not Authorized to Change this Internship";
    await Intern.deleteOne({ _id: internId });

    //Delete the Internship reference from the users doc that created it
    let teacher= await Teacher.findOne({_id: user.id});
    let update= teacher.internships;
    update =update.filter(function(value, index, arr){ 
        return value != internId;
    });
    await teacher.updateOne({internships:update});

    //TODO Delete all applications for the given Intern
    await Application.deleteMany({internship_id:internId});

    return;
}