import dbConnect from "../database/dbconnect";
import Student from "../database/studentSchema"
import cryptoJs from "crypto-js";
import jwt from 'jsonwebtoken';
dbConnect();

module.exports = {
    getStudents,
    create,
    getStudentById,
    update,
    deleteStudentById
};

//Get all Students
async function getStudents(user1)
{
    return await Student.find();
}

// Create a Student Profile
async function create(body)
{
    //TODO Handle error when unique property is breached 
    const pass=body.password;
    body.password=cryptoJs.AES.encrypt(pass, process.env.SECRET_KEY).toString();
    const user = await Student.create(body);
    return user;
}

//Get the Student by ID
async function getStudentById(studentId)
{
    const student = await Student.findOne({_id: studentId});
    if(!student)
    throw "Student not Found";
    const {password,_id,isAdmin,__v, ...info}=student._doc;
    return info;
}

//Update the Student doc. 
async function update(user,user_id,body)
{
    let {applications,...info}=body;
    body=info;
    if(user.isAdmin==false&&user.id!=user_id)
    throw "Unauthorized Access";
    if(body.password)
    {
        let pass=body.password;
        body.password=cryptoJs.AES.encrypt(pass, process.env.SECRET_KEY).toString();
    }
    if(user.isAdmin==false)
    {
        body.isAdmin=false;
    }
    let student=await Student.findById(user_id);
    if(!student)
    throw "Student not Found";
    await student.updateOne(body);
    student=await Student.findById(user_id);
    return student._doc;
}

//Delete the Student and all their applications
async function deleteStudentById(user,studentId)
{
    let student=await getStudentById(studentId);
    if(user.isAdmin==false&&user.id!=studentId)
    throw "Unauthorized Access";
    if(!student)
    throw "Student not found";
    await Student.deleteOne({ _id: studentId });

    //Delete all applications
    await Application.deleteMany({student_id:studentId});

    return;
}