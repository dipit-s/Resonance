import dbConnect from "../../../database/dbconnect";
import Students from "../../../database/studentSchema";
import withProtect from "../../../middleware/withProtect"
import jwt from "jsonwebtoken";
import cryptoJs from "crypto-js";
import errorHandler from "../../../middleware/error-handler";
const studentservice=require("../../../services/student.service");

dbConnect();

const handler= async function handler(req, res) {

  // Accept the request parameters.

  const { user_id } = req.query;

  const { method } = req;


  //Route to either Read Update or Delete operations on basis of request.

  switch (method) {

    case "GET":

      //Get student details and display if the user is logged in

      {
      try {
        const student = await studentservice.getStudentById(user_id);
        res.status(200).json({success: true,data : student});
      } catch (err) {
        errorHandler(err,req,res);
      }
      break;
    }
    case "PUT":

    //Edit the user after validating Authentication of Student
    {
    try
      {
        let user= jwt.decode(req.headers.authorization.split(" ")[1]);
        let student=await studentservice.update(user,user_id,req.body);
        res.status(200).json({success:true,student});
      }
      catch(err)
      {
        errorHandler(err,req,res);
      }
      break;
    }
      case "DELETE":

      // Delete the User after validating Authentication of Student.
      try
        {
          const user= jwt.decode(req.headers.authorization.split(" ")[1]);
          await studentservice.deleteStudentById(user,user_id);
          res.status(200).json({success:true,data:"Your profile was Deleted"});
        }
      catch(err)
      {
        errorHandler(err,req,res);
      }
      break;
    default:
      errorHandler("Request not Handled",req,res);
      break;
  }
}

export default withProtect(handler);