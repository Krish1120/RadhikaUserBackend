const userModel=require('../../models/user');

exports.verifyUser=(req,res,next)=>{
    userModel.findOne({
        phone:req.body.phone
    }).exec((err,phone)=>{
        if(err){
            console.log((err,'Error while finding user email.'));
            return res.status(404).json({
                message:'Cannot find user phone.'
            })
        }
        if(phone){
            console.log('User phone already exists.');
            return res.status(404).json({
                message:'User phone already exists.'
            })
        }
        next();
    })
}