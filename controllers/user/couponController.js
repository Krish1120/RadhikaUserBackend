const couponModel = require("../../models/coupon");
const bannerModel = require("../../models/banner");

//show product details page controller.
exports.viewAllCoupons = async (req, res) => {
  try {
    let coupons;
    coupons = await couponModel.find();
    res.status(200).json(coupons);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.viewAllBanners = async (req, res) => {
  try {
    let banners;
    banners = await bannerModel.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json(err);
  }
};
