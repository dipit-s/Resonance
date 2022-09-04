import jwt from 'jsonwebtoken';


const withProtect=(handler) => {
    return async(req,res) =>{

        //Get token and check if it exists

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

            if(!req.user)
            {
                return res.status(403).json("Token is not a valid Token");
            }
            return handler(req,res);
        }
        else
        {
            res.status(401).json("You are not authenticated.Please Login");
        }
    };
};

export default withProtect;