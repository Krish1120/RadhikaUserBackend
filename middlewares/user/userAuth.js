const { verify } = require('jsonwebtoken');
const jwt=require('jsonwebtoken');

exports.authJwt=(req,res,next)=>{
    if(req.cookies && req.cookies.userToken){
        jwt.verify(req.cookies.userToken,'aJhgfaf3153@_Project_Radhika_',(err,data)=>{
            req.user=data
            next();
        })
    }else{
        next()
    }
}