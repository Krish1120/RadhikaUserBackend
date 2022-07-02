require('dotenv').config();
const { response } = require('express');
const fast2sms=require("fast-two-sms");
const {FAST2SMS}=require('../config');

exports.generateOTP=(otp_length)=>{
    var digits="0123456789";
    let OTP="";
    for(let i=0; i<otp_length;i++){
        OTP +=digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

exports.fast2sms=async({variables_values,contactNumber},next)=>{
    try{
        const res = await fast2sms.sendMessage({
            authorization: process.env.API_KEY,
            route: "dlt",
            sender_id: process.env.DLT_SENDER_ID,
            message:process.env.YOUR_MESSAGE_ID,
            variables_values,
            numbers:[contactNumber],
        });
        console.log(res);
    }catch(error){
        next(error);
    }
};