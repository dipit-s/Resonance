import { JsonWebTokenError } from "jsonwebtoken";
import dbConnect from "../../../database/dbconnect";
import Teachers from "../../../database/teacherSchema";
import withProtect from "../../../middleware/withProtect"
import jwt from "jsonwebtoken";
import cryptoJs from "crypto-js";
const teacherservice= require("../../../services/teacher.service");
import errorHandler from "../../../middleware/error-handler";
dbConnect();

const handler= async function handler(req, res) {

    //Accept the user id and Request method from request.

    const { user_id } = req.query;

    const { method } = req;


    // Route on basis of Request to Read, Delete or Update the Record.

    switch (method) {
        case "GET":

        //Get Teacher details after authenticating user.

        try {
            let info= await teacherservice.getTeacherById(user_id);
            res.status(200).json({success:true, data: info});
        } catch (err) {
            errorHandler(err,req,res);    
        }
        break;
        case "PUT":

        // Update the Teacher Record After Authenticating the user.

        {
            try{
            const user= jwt.decode(req.headers.authorization.split(" ")[1]);
            let teacher=await teacherservice.update(user,user_id,req.body);
            res.status(200).json({success:true , data:teacher});
            }
            catch(err){
                errorHandler(err,req,res);
            }
            break;
        }
        case "DELETE":

        // Delete the Teacher's document after Authenticating the user requesting. 

        {
            try{
                const user= jwt.decode(req.headers.authorization.split(" ")[1]);
                await teacherservice.deleteTeacherById(user,user_id);
                res.status(200).json({success:true,data:"The Profile was deleted"});
            }
            catch(err)
            {
                errorHandler(err,req,res);
            }
            break;
        }
        default:
        errorHandler("Request Not Handled",req,res);
        break;
    }
};

export default withProtect(handler);