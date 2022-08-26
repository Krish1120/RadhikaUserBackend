const express = require("express");
const Route = express.Router();
const couponController = require("../../controllers/user/couponController");

Route.get("/viewAllCoupons", couponController.viewAllCoupons);
Route.get("/viewAllBanners", couponController.viewAllBanners);

module.exports = Route;
