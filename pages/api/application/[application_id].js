import dbConnect from "../../../database/dbconnect";
import Application from "../../../database/applicationSchema";
import withProtect from "../../../middleware/withProtect"
import jwt from "jsonwebtoken";
import cryptoJs from "crypto-js";
const applicationservice=require("../../../services/application.service")
import errorHandler from "../../../middleware/error-handler";
dbConnect();

const handler= async function handler(req, res) {

  // Accept the request parameters.

  const { application_id } = req.query;

  const { method } = req;


  //Route to either Read or Delete operations on basis of request.

  switch (method) {

    case "GET":

      //Get Application details and display if the user is logged in and authorised

      {
      try {
        const user= jwt.decode(req.headers.authorization.split(" ")[1]);
        const application = await applicationservice.getApplicationById(user,application_id)
        return res.status(200).json({success:true,data: application});
      } catch (err) {
        errorHandler(err,req,res);
      }
      break;
    }
      case "DELETE":

      // Delete the Application after validating Authentication of user.
      try
        {
          const user= jwt.decode(req.headers.authorization.split(" ")[1]);
          await applicationservice.deleteApplicationById(user,application_id);
          res.status(200).json({success:true,data:"The application was deleted"});  
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