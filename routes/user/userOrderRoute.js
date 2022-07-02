const express=require('express');
const Route=express.Router();
const orderController=require('../../controllers/user/userOrders');

Route.post('/addOrder',orderController.userAuth,orderController.addOrder);
Route.get('/showCart/find/:userId',orderController.userAuth,orderController.showOrder);
Route.put('/cancelOrder/:id',orderController.userAuth,orderController.cancelOrder);


//Razorpay//
Route.post('/create-Order',orderController.createOrder);
Route.get('/get-razorpay-key',orderController.getRazorpay);
Route.post('/pay-Order',orderController.payOrder)



module.exports=Route