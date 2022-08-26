const express = require("express");
const Route = express.Router();
const userProductController = require("../../controllers/user/userProductController");
const cartController = require("../../controllers/user/userProductController");
const wishlistController = require("../../controllers/user/userProductController");

Route.get(
  "/viewAllProducts",
  userProductController.userAuth,
  userProductController.viewAllProducts
);
Route.get(
  "/viewAllProductsSearch",
  userProductController.userAuth,
  userProductController.viewAllProductsSearch
);
Route.post("/addToCart", cartController.userAuth, cartController.addToCart);
Route.get(
  "/showCart/find/:userId",
  cartController.userAuth,
  cartController.showCart
);
Route.put(
  "/updateCart/:id",
  cartController.userAuth,
  cartController.updateCart
);
Route.post(
  "/deleteCart/:id",
  cartController.userAuth,
  cartController.deleleCart
);
Route.post(
  "/addToWishlist",
  wishlistController.userAuth,
  wishlistController.addToWishlist
);
Route.get(
  "/showWishlist/find/:userId",
  wishlistController.userAuth,
  wishlistController.showWishlist
);
Route.post(
  "/checkWishlist/:id",
  wishlistController.userAuth,
  wishlistController.checkWishlist
);
Route.put(
  "/updateWishlist/:id",
  wishlistController.userAuth,
  wishlistController.updateWishlist
);
Route.post(
  "/deleteWishlist/:id",
  wishlistController.userAuth,
  wishlistController.deleleWishlist
);

module.exports = Route;
