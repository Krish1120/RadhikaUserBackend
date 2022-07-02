const express=require('express');
const Route=express.Router();
const userProductController=require('../../controllers/user/userProductController');
const cartController=require('../../controllers/user/userProductController');


Route.get('/viewAllProducts',userProductController.userAuth,userProductController.viewAllProducts);
Route.post('/addToCart',userProductController.userAuth,cartController.addToCart);
Route.get('/showCart/find/:userId',userProductController.userAuth,cartController.showCart);
Route.put('/updateCart/:id',userProductController.userAuth,cartController.updateCart);
Route.delete('/deleteCart/:id',userProductController.userAuth,cartController.deleleCart);



module.exports=Route;