const express=require('express');

//about us view page controller.
exports.aboutUs=(req,res)=>{
    res.status(200).json({
        status:'success',
        message:"Welcome to about us page."
    })
}

//contact us view page controller.
exports.contactUs=(req,res)=>{
    res.status(200).json({
        status:'success',
        message:"Welcome to contact us page."
    })
}
