const express=require('express');
const Route=express.Router();
const userController=require('../../controllers/user/userController');
const verify=require('../../middlewares/user/verifyUser');

Route.get('/',userController.startPage);
Route.get('/signup',userController.signup);
Route.post('/addSignup',[verify.verifyUser],userController.addSignup);
Route.get('/login',userController.login);
Route.post('/postLogin',userController.postLogin);
Route.get('/verifyOTP/:id',userController.verifyOTP);
Route.post('/postVerifyOTP',userController.postVerifyOTP);
Route.get('/logout/:id',userController.logout);



module.exports=Route;