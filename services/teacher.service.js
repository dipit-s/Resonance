import dbConnect from "../database/dbconnect";
import Teacher from "../database/teacherSchema"
import cryptoJs from "crypto-js";
import jwt from 'jsonwebtoken';
import Intern from "../database/internshipSchema";
import Application from "../database/applicationSchema";
dbConnect();

module.exports = {
    getTeachers,
    create,
    getTeacherById,
    update,
    deleteTeacherById
};

//Get the list of Teachers
async function getTeachers()
{
    return await Teacher.find();
}

//Create the Teacher id
async function create(body)
{
    const pass=body.password;
    body.password=cryptoJs.AES.encrypt(pass, process.env.SECRET_KEY).toString();
    const user = await Teacher.create(body);
    return user;
}

//Return the Teacher's Profile with masked details.
async function getTeacherById(teacherId)
{
    const teacher = await Teacher.findOne({_id: teacherId});
    if(!teacher)
    {
        throw "No such teacher Found";
    }
    const {password,_id,isAdmin,__v, ...info}=teacher._doc;
    return info;
}

//Update the Teacher's body on basis of request
async function update(user,user_id,body)
{
    let {internships,...info}=body;
    body=info;
    if(user.isAdmin==false&&user.id!=user_id)
    throw "Unauthorized Access";
    if(user.isAdmin==false)
    body.isAdmin=false;
    if(body.password)
    {
        let pass=body.password;
        body.password=cryptoJs.AES.encrypt(pass, process.env.SECRET_KEY).toString();
    }
    let teacher=await Teacher.findById(user_id);
    if(!teacher)
    throw "No such Teacher found";
    await teacher.updateOne(body);
    teacher=await Teacher.findById(user_id);
    return teacher;
}

//Delete the teacher followed by deleting all Internships posted by him and Applications recieved
async function deleteTeacherById(user,teacherId)
{
    if(user.isAdmin==false&&user.id!=teacherId)
    throw "Unauthorized Access";
    await Teacher.deleteOne({ _id: teacherId });
    
    //Delete the Internships posted by the teacher
    await Intern.deleteMany({postedby:teacherId});
    
    //Delete all Applications submitted to the teacher
    await Application.deleteMany({teacher_id:teacherId});

    return;
}