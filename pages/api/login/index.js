import dbConnect from "../../../database/dbconnect";
import Student from "../../../database/studentSchema";
import Teacher from "../../../database/teacherSchema";
const CryptoJS = require("crypto-js");
const jwt= require("jsonwebtoken");
dbConnect();


export default async (req, res) => {
 

    // Recieve the Request method and body parameters

    const { method } = req;
    const {username, password, type}= req.body;


    // Based on the User type choose one of the two responses : Student or Teacher

    if(type =="Student")
    {

        // Route on basis of POST Request and validate Credentials.

      switch (method) {
        case "POST":
        try {
            let user= await Student.find({username : username});
            if(user.length==1)
            {
                user=user[0];
                let pass  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
                if(pass==password)
                {
                    const {password, ...info}=user._doc;
                    const accessToken= jwt.sign({id:user._id, type: "Student", isAdmin: user.isAdmin},process.env.SECRET_KEY,{expiresIn:'1y'});
                    res.status(201).json({ success: true, data: {...info,accessToken }});
                }
                else
                {
                    res.status(404).json({success: false, data: "Username or password is wrong ", })
                }
            }
            else if(user.length==0)
            {
                res.status(404).json({success: false, data: user})
            }
        } catch (error) {
            res.status(400).json({ success: false });
            
        }
        break;
        default:
        res.status(400).json({ success: false });
        break;
    }
    }
    else if(type=="Teacher")
    {

        //Route on Basis of type of Request POST, Validate credentials.

        switch (method) {
            case "POST":
            try {
                let user= await Teacher.find({username: username});
                if(user.length==1)
                {
                    user=user[0];
                    let pass  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
                    if(pass==password)
                    {   
                        const {password,...info}=user._doc;
                        const accessToken= jwt.sign({id:user._id, type: "Teacher", isAdmin: user.isAdmin},process.env.SECRET_KEY,{expiresIn:'1y'});
                        res.status(201).json({ success: true, data: {...info, accessToken }});
                    }
                }
                else
                {
                    res.status(404).json({success: false, data: "Username or password is wrong"})
                }
            } catch (error) {
                res.status(400).json({ success: false });
                console.log(res.status);
                console.log(error);
            }
            break;
            default:
            res.status(400).json({ success: false });
            break;
        }
        
    }
    else
    {
        res.status(400).json({success:false});
    }
};

