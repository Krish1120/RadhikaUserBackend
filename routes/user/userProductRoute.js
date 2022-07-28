const express = require("express");
const Route = express.Router();
const userProductController = require("../../controllers/user/userProductController");
const cartController = require("../../controllers/user/userProductController");

Route.get(
  "/viewAllProducts",
  userProductController.userAuth,
  userProductController.viewAllProducts
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

module.exports = Route;
