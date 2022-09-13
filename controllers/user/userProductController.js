const express = require("express");
const productModel = require("../../models/product");
const cartModel = require("../../models/cart");
const wishlistModel = require("../../models/wishlist");
//show product details page controller.
exports.viewAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products = [];

    if (qNew) {
      products = await productModel.find().sort({ createdAt: -2 }).limit(5);
    } else if (qCategory) {
      products = await productModel.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      let categories;
      categories = await productModel.find();
      categories.forEach((product) => {
        let category = product.category;
        let itemIndex = products.findIndex((p) => p.category === category);
        if (itemIndex === -1) {
          products.push({ category: category, productData: [] });
        }
      });
      for (let i = 0; i < products.length; i++) {
        let category = products[i].category;
        categories.forEach((item) => {
          if (item.category === category) {
            products[i].productData.push(item);
          }
        });
      }
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
//view all products for search.
exports.viewAllProductsSearch = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products = [];

    if (qNew) {
      products = await productModel.find().sort({ createdAt: -2 }).limit(5);
    } else if (qCategory) {
      products = await productModel.find({
        category: {
          $in: [qCategory],
        },
      });
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
    let { product, quantity, size } = req.body.products[0];
    product.size = size;
    let itemIndex = Cart.products.findIndex(
      (p) => p.product._id === product._id && p.product.size === product.size
    );
    if (itemIndex > -1) {
      let productItem = Cart.products[itemIndex];
      productItem.quantity = productItem.quantity + quantity;
      Cart.products[itemIndex] = productItem;
    } else {
      Cart.products.push({ product, quantity });
    }
    Cart.save();
    res.status(200).json(Cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update cart product quantity.
exports.updateProductQuantity = async (req, res) => {
  try {
    let Cart = await cartModel.findById(req.params.id);
    let { productID, size, action } = req.body;
    let itemIndex = Cart.products.findIndex(
      (p) => p.product._id === productID && p.product.size === size
    );
    let productItem = Cart.products[itemIndex];
    if (action === "plus") {
      productItem.quantity = productItem.quantity + 1;
      Cart.products[itemIndex] = productItem;
    } else {
      productItem.quantity = productItem.quantity - 1;
      Cart.products[itemIndex] = productItem;
    }
    Cart.save();
    res.status(200).json("CartItem quantity Updated.");
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete cart.
exports.deleleCart = async (req, res) => {
  try {
    let Cart = await cartModel.findById(req.params.id);
    let { productID, size } = req.body;
    let itemIndex = Cart.products.findIndex(
      (p) => p.product._id === productID && p.product.size === size
    );
    Cart.products.splice(itemIndex, 1);
    Cart.save();
    res.status(200).json("CartItem has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};

//create wishlist for user.
exports.addToWishlist = async (req, res) => {
  const wishlist = await wishlistModel.find({ userID: req.body.userID });
  try {
    if (wishlist.length === 0) {
      const newWishlist = new wishlistModel(req.body);
      const savedWishlist = await newWishlist.save();
      res.status(200).json(savedWishlist);
    } else {
      res.status(200).json(wishlist);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//show wishlist.
exports.showWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistModel.find({ userID: req.params.userId });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update wishlist.
exports.updateWishlist = async (req, res) => {
  try {
    let Wishlist = await wishlistModel.findById(req.params.id);
    let { product } = req.body.products[0];
    let itemIndex = Wishlist.products.findIndex(
      (p) => p.product._id === product._id
    );
    if (itemIndex > -1) {
      res.status(200).json({ message: "Product exists in wishlist" });
      return;
    } else {
      Wishlist.products.push({ product });
    }
    Wishlist.save();
    res.status(200).json(Wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
};

//check product in wishlist.
exports.checkWishlist = async (req, res) => {
  let favourite = false;
  try {
    let Wishlist = await wishlistModel.findById(req.params.id);
    let { productID } = req.body.products[0];
    let itemIndex = Wishlist.products.findIndex(
      (p) => p.product._id === productID
    );
    if (itemIndex > -1) {
      favourite = true;
    }
    res.status(200).json(favourite);
  } catch (err) {
    res.status(500).json(favourite);
  }
};

//delete wishlist.
exports.deleleWishlist = async (req, res) => {
  try {
    let Wishlist = await wishlistModel.findById(req.params.id);
    let { productID } = req.body;
    let itemIndex = Wishlist.products.findIndex(
      (p) => p.product._id === productID
    );
    Wishlist.products.splice(itemIndex, 1);
    Wishlist.save();
    res.status(200).json("WishlistItem has been deleted...");
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
