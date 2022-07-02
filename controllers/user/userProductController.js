const express=require('express');
const productModel=require('../../models/product');
const cartModel=require('../../models/cart');


//show product details page controller.
exports.viewAllProducts=async(req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category;
    try{
        let products;
        
        if(qNew){
            products=await productModel.find().sort({createdAt:-2}).limit(5)
        }else if(qCategory){
            products=await productModel.find({category:{
                $in:[qCategory],
            }})
        }else{
            products=await productModel.find();
        }
        res.status(200).json(products)
    }catch(err){
        res.status(500).json(err)
    }
}

//create cart for user.
exports.addToCart=async(req,res)=>{
    const newCart=new cartModel(req.body);

    try{
        const savedCart=await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
};

//show cart.
exports.showCart=async(req,res)=>{
    try{
        const cart=await cartModel.find({userId:req.params.userId});
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
};

//update cart.
exports.updateCart=async(req,res)=>{
    try{
        const updatedCart=await cartModel.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
};

//delete cart.
exports.deleleCart=async(req,res)=>{
    try{
        await cartModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...")
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