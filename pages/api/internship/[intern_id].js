import dbConnect from "../../../database/dbconnect";
import Interns from "../../../database/internshipSchema";
import withProtect from "../../../middleware/withProtect"
import jwt from "jsonwebtoken";
import errorHandler from "../../../middleware/error-handler";

const internshipservice=require("../../../services/internship.service");

dbConnect();

const handler= async function handler(req, res) {

  // Accept the request parameters.

  const { intern_id } = req.query;

  const { method } = req;


  //Route to either Read Update or Delete operations on basis of request.

  switch (method) {

    case "GET":

      //Get intern details and display if the user is logged in
      
      {
      try {
        let user= jwt.decode(req.headers.authorization.split(" ")[1]);
        const intern = await internshipservice.getInternById(user,intern_id);
        res.status(200).json({success: true, data: intern});
        } catch (err) {
        errorHandler(err,req,res);
      }
      break;
    }
    case "PUT":

    //Edit the Intern after Authentication of User
    try
      {
        let user= jwt.decode(req.headers.authorization.split(" ")[1]);
        let intern = await internshipservice.update(user,intern_id,req.body);
        res.status(200).json({success : true, data:intern});
      }
      catch(err)
      {
        errorHandler(err,req,res);
      }
      break;
      case "DELETE":

      // Delete the Internship after validating Authentication of User.
      
      try
      {
          const user= jwt.decode(req.headers.authorization.split(" ")[1]);
          await internshipservice.deleteInternById(user,intern_id);
          res.status(200).json({success:true,data:"The Internship was deleted"});
      }
      catch(err)
      {
        errorHandler(err,req,res);
      }
      break;
    default:
      res.status(501).json({ success: false });
      break;
  }
}

export default withProtect(handler);