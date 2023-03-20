const jwt = require('jsonwebtoken');

const AuthenticationMiddleWare = (req,res,next)=>{
    const token = req.header('x-auth-token');
    //chcek for token
    if(!token)
    {
        res.status(401).json({message:'No token,authorization denied!'});
    }

    try {
        //Verify token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //add user from payload 
        req.user = decoded;
        next();
    }
    catch(e) {
   res.status(400).json({message:"Token is not valid"})
    }
}
module.exports = AuthenticationMiddleWare;