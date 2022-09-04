import dbConnect from "../../../database/dbconnect";
import Application from "../../../database/applicationSchema";
import withProtect from "../../../middleware/withProtect";
import jwt from 'jsonwebtoken';
import errorHandler from "../../../middleware/error-handler";
const applicationservice= require("../../../services/application.service");

dbConnect();

const handler = async function handler(req, res) {

    const method = req.method;


    switch (method) {

        case "GET":{
            try{
                const user = jwt.decode(req.headers.authorization.split(" ")[1]);
                const applications= await applicationservice.getApplications(user); 
                res.status(200).json({success: true,data: applications});
                }
            catch(err)
            {
                res.status(400).json({success: false, error: err});
            }
            break;
        }
        // Create an Application

        case "POST":
            try {
                const user = jwt.decode(req.headers.authorization.split(" ")[1]);
                let app= await applicationservice.create(user,req.body);
                res.status(200).json({success:true,data:app});
            }
            catch (err) {
                errorHandler(err,req,res);
            }
            break;
        default:
            errorHandler("Request Not Handled",req,res);
            break;
    }

}

export default withProtect(handler);