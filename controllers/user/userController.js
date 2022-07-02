require('dotenv').config();

const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userModel=require('../../models/user');

const {generateOTP,fast2sms}=require('../../utils/otp');

//start page controller.
exports.startPage=(req,res)=>{
    res.status(200).json({
        status:'success',
        message:'Welcome to start page.'
    })
}

//user signup view page controller.
exports.signup=(req,res)=>{
    res.status(200).json({
        status:'success',
        message:"Welcome to user Signup page."
    })
}

//user post signup data controller.
exports.addSignup=async(req,res,next)=>{
    userModel({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        state:req.body.state,
        pincode:req.body.pincode,
    }).save((err,user)=>{
        if(!err){
            res.status(200).json({
                status:'Success',
                result:user,
                message:'User added.'
            })
        }else{
            res.status(404).json({
                result:err,
                message:'Error while adding user.'
            })
        }
    })
}

//user login view page controller.
exports.login=(req,res)=>{
    res.status(200).json({
        status:'success',
        message:"Welcome to user login page."
    })
}

//user post login page view controller.
exports.postLogin=async(req,res,next)=>{
    try{
        const {phone}=req.body;
        const user=await userModel.findOne({phone});

        if(!user){
            next({status:400, message: "Phone number not found"});
            return;
        }

        res.status(201).json({
            type:"Success",
            message:"OTP sent to the registered phone number.",
            data:{
                userId:user._id,
            },
        });

        const otp=generateOTP(6);
        user.phoneOTP=otp;
        await user.save();
        await fast2sms(
            {
                variables_values:otp,
                contactNumber:user.phone,
            },
            next
        );
    }catch(error){
        next(error);
    }
}

//verify OTP page.
exports.verifyOTP=(req,res)=>{
    const userId=req.params.id
    userModel.findById(userId).then((onResolved)=>{
        res.status(200).json({
            status:'success',
            message:"Welcome to user verify OTP page."
        })
    },
    (onReject)=>{
        res.send(error)
    })
    
}

//post verify OTP controller.
exports.postVerifyOTP=async(req,res,next)=>{
    try{
        const {otp,userId}=req.body;
        const user = await userModel.findById(userId);
        if(!user){
            next({status:400,message:'User not found'});
            return;
        }

        if(user.phoneOTP !== otp){
            next({status:400,message:'OTP mismatch.'});
            return;
        }

            
        const token=jwt.sign({
            userId: user._id
        },'aJhgfaf3153@_Project_Radhika_')
        res.cookie('userToken',token)
            user.status="true";
            user.phoneOTP="";
            await user.save();
            res.status(201).json({
                type:"success",
                message:"OTP verified.",
                data:{
                    token,
                    userId:user._id,
                },
            })
    }catch(error){
        next(error)
    }
}

//user logout.
exports.logout=async(req,res,next)=>{
    try{
        const userId = req.params.id;
        const user=await userModel.findById(userId)
        if(!user){
            next({status:400, message: "Error!!! no such user."});
            return;
        }else{
            res.clearCookie('userToken');
            res.status(201).json({
                status:'Success',
                message:'Logout Successful'
            })
        }
        user.status=false;
        await user.save();
    }catch(error){
        next(error);
    }
}



//userAuth controller.
exports.userAuth=(req,res,next)=>{
    if(req.user){
        console.log(req.user);
        next();
    }else{
        console.log(req.user,'err');
        res.redirect('/login')
        res.status(404).json({
            status:'error',
            result:req.user
        })
    }
}