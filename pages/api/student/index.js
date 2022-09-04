import cryptoJs from "crypto-js";
import dbConnect from "../../../database/dbconnect";
import Student from "../../../database/studentSchema";
import withProtect from "../../../middleware/withProtect";
import jwt from 'jsonwebtoken';
const studentservice=require("../../../services/student.service");
import errorHandler from "../../../middleware/error-handler";
dbConnect();


export default async (req, res) => {
 

  // Store the type of HTTP request and Route accordingly

  const { method } = req;

  switch (method) {
    case "GET":
      const authHeader=req.headers.authorization;

      //Check if user is Loggedin or Not and respond Appropriately.

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
            res.status(401).json("You are not Authenticated.Please Login");
            break;
        }

        //Check For Admin access and respond Appropriately.

        if(!req.user)
        {
          break;
        }
        if(!req.user.isAdmin)
        {
          res.status(403).json("You are not Authorised");
          break;
        }
        
      try {
        const users = await studentservice.getStudents();
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":

      // Create a new Student user.

      try {
        const user = await studentservice.create(req.body);
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        errorHandler(err,req,res);
      }
      break;
    default:
      errorHandler("Request not Handled",req,res);
      break;
  }
 
};

