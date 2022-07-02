const express=require('express');
const Route=express.Router();
const userMiscController=require('../../controllers/user/userMisc');

Route.get('/about-us',userMiscController.aboutUs);
Route.get('/contact-us',userMiscController.contactUs);




module.exports=Route