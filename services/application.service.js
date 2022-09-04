import dbConnect from "../database/dbconnect";
import Application from "../database/applicationSchema";
import Teacher from "../database/teacherSchema";
import cryptoJs from "crypto-js";
import jwt from 'jsonwebtoken';
import Intern from "../database/internshipSchema";
import Student from "../database/studentSchema";
dbConnect();

module.exports = {
    getApplicationById,
    deleteApplicationById,
    getApplications,
    create
};

//Get All Live Applications
async function getApplications(user)
{
    if(user.isAdmin==false)
    throw "User is not Authorised";
    return await Application.find();

}

//Create an Application and add its reference to the student and intern documents
async function create(user,body)
{
    if(user.type!="Student")
    throw "You cannot Apply!";
    body.student_id=user.id;
    let intern=await Intern.findOne({_id:body.internship_id});
    body.teacher_id=intern.postedby;
    let app = await Application.create(body);

    //Create applications reference to Intern document
    let update=intern.applications;
    update.push(app._id);
    await intern.updateOne({applications:update});

    //Add Application reference to the student document
    let student= await Student.findOne({_id:user.id});
    update=student.applications;
    update.push(app._id);
    await student.updateOne({applications:update});

    return  app;
}

// Get an application by its id 
async function getApplicationById(user,application_id)
{
    let app=await Application.findOne({_id: application_id});
    if(!app)
    throw "Application Not Found";
    if(user.isAdmin==false&&user.id!=app.student_id&&user.id!=teacher_id)
    throw "You are not Authorized";
    return app;
}

//Delete an Application and it's reference from Student doc and Internship doc
async function deleteApplicationById(user,application_id)
{
    let app=await getApplicationById(user,application_id);
    await Application.deleteOne({_id:application_id});

    //Remove application reference from Intern
    let internId=app.internship_id;
    let intern= await Intern.findOne({_id:internship_id});
    let update= intern.applications;
    update=update.filter(function(value, index, arr){ 
        return value != application_id;
    });
    await intern.updateOne({applications:update});

    //Remove the application reference from Student doc
    let studentId=app.student_id;
    let student=await Student.findOne({_id:studentId});
    update=student.applications;
    update=update.filter(function(value, index, arr){ 
        return value != application_id;
    });
    await student.updateOne({applications:update});

    return ;
}