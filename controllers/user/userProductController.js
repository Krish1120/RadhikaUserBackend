const express = require("express");
const productModel = require("../../models/product");
const cartModel = require("../../models/cart");

//show product details page controller.
exports.viewAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await productModel.find().sort({ createdAt: -2 }).limit(5);
    } else if (qCategory) {
      products = await productModel
        .find({
          category: {
            $in: [qCategory],
          },
        })
        .skip(3)
        .limit(2);
    } else {
      products = await productModel.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

//create cart for user.
exports.addToCart = async (req, res) => {
  const cart = await cartModel.find({ userID: req.body.userID });
  try {
    if (cart.length === 0) {
      const newCart = new cartModel(req.body);
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } else {
      res.status(200).json(cart);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//show cart.
exports.showCart = async (req, res) => {
  try {
    const cart = await cartModel.find({ userID: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update cart.
exports.updateCart = async (req, res) => {
  try {
    let Cart = await cartModel.findById(req.params.id);
    let { productID, quantity } = req.body.products[0];
    let itemIndex = Cart.products.findIndex((p) => p.productID === productID);
    if (itemIndex > -1) {
      let productItem = Cart.products[itemIndex];
      productItem.quantity = productItem.quantity + quantity;
      Cart.products[itemIndex] = productItem;
    } else {
      Cart.products.push({ productID, quantity });
    }
    Cart.save();
    res.status(200).json(Cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete cart.
exports.deleleCart = async (req, res) => {
  try {
    let Cart = await cartModel.findById(req.params.id);
    let { productID } = req.body;
    let itemIndex = Cart.products.findIndex((p) => p.productID === productID);
    Cart.products.splice(itemIndex, 1);
    Cart.save();
    res.status(200).json("CartItem has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//userAuth controller.
exports.userAuth = (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    next();
  } else {
    console.log(req.user, "err");
    res.redirect("/login");
    res.status(404).json({
      status: "error",
      result: req.user,
    });
  }
};
