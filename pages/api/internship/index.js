import dbConnect from "../../../database/dbconnect";
import Intern from "../../../database/internshipSchema";
import withProtect from "../../../middleware/withProtect";
import jwt from 'jsonwebtoken';
const internshipservice=require("../../../services/internship.service");
import errorHandler from "../../../middleware/error-handler";

dbConnect();

const handler= async function handler(req, res) {

    const method =req.method;


    switch(method)
    {

        //Read all Internships
        case "GET":
            try{
                const interns= await internshipservice.getInternships(); 
                res.status(200).json({success: true,data: interns});
                }
            catch(err)
            {
                errorHandler(err,req,res);
            }
            break;

        // Create an Internship
        
        case "POST":
            try{
            const user= jwt.decode(req.headers.authorization.split(" ")[1]);
            const intern= await internshipservice.create(user,req.body);
            res.status(201).json({success: true, data: intern});
            }
            catch(err)
            {
                errorHandler(err,req,res);
            }
            break;
        default:
            errorHandler("Request Not Handled",req,res);
            break;
    }

}

export default withProtect(handler);