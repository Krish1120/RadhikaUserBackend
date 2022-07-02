const express=require('express');
const razorpay=require('razorpay');
const dotenv=require('dotenv');
const orderModel=require('../../models/order');

//create order.
exports.addOrder=async(req,res)=>{
    const newOrder=new orderModel(req.body);

    try{
        const savedOrder=await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
};

//show user order.
exports.showOrder=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.params.userId});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
};

//cancel the order.
exports.cancelOrder=async(req,res)=>{
    try{
        const canceledOrder=await orderModel.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {new:true},
        );
        canceledOrder.status="cancel";
        await canceledOrder.save();
        res.status(200).json(canceledOrder);
    }catch(err){
        res.status(500).json(err);
    }
};

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


//Razorpay payment controller.

//Place order.
exports.createOrder=async(req,res)=>{
    try{
        const instance=new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });
        const options={
            amount:req.body.amount,
            currency:'INR',
        };
        const order=await instance.orders.create(options);
        if(!order) return res.status(500).send('Some error occured');
        res.send(order);
    }catch(error){
        res.status(500).send(error);
    }
}

//Get Razorpay key.
exports.getRazorpay=(req,res)=>{
    res.send({key: process.env.RAZORPAY_KEY_ID});
}

//Pay order.
exports.payOrder=async(req,res)=>{
    try{
        const {amount,razorpayPaymentId,razorpayOrderId,razorpaySignature}=req.body;
        const newPayment=orderModel({
            isPaid:true,
            amount:amount,
            razorpay:{
                orderId:razorpayOrderId,
                paymentId:razorpayPaymentId,
                signature:razorpaySignature,
            },
        });
        await newPayment.save();
        res.send({
            msg:'Payment successful.'
        });
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}