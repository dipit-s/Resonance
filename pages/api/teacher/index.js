import dbConnect from "../../../database/dbconnect";
import Teacher, { create } from "../../../database/teacherSchema"
import cryptoJs from "crypto-js";
import jwt from 'jsonwebtoken';
import errorHandler from "../../../middleware/error-handler";
const teacherservice= require("../../../services/teacher.service");

dbConnect();

export default async (req, res) => {
 

  // Get the Request Parameters and Route on those basis to Get or Post Request.

  const { method } = req;

  switch (method) {
    case "GET":

    // Authenticate the user and respond with the list of all Teachers.
      try{
      const authHeader=req.headers.authorization;
      if(authHeader)
        {
            const token =authHeader.split(" ")[1];
            jwt.verify(token,process.env.SECRET_KEY, (err,user)=>{
                if(err){
                    return res.status(403).json("Token is not a valid token");
                }
                else{
                    req.user= user;
                }
            });
        }
        else
        {
            return res.status(401).json("You are not Authenticated.Please Login");
        }
        if(!req.user)
        {
          break;
        }
        if(!req.user.isAdmin)
        {
          return res.status(401).json("You are not Authorised");
        }
      }
      catch(err)
      {
        res.status(400).json({success:false, data: err});
      }

      try {
        const users = await teacherservice.getTeachers();
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        errorHandler(error,req,res);
      }
      break;
    case "POST":

      //Check the Request body to Create a New Teacher Document

      try {
        const user= await teacherservice.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        errorHandler(error,req,res);
      }
      break;
    default:
      errorHandler("Request Not Handled",req,res);
      break;
  }
};

