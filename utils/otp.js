require("dotenv").config();
const { response } = require("express");
const fast2sms = require("fast-two-sms");
const { FAST2SMS } = require("../config");
const unirest = require("unirest");

var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

exports.generateOTP = (otp_length) => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

exports.fast2sms = async ({ variables_values, contactNumber }, next) => {
  try {
    req.headers({
      authorization: process.env.API_KEY,
      "Content-Type": "application/json",
    });

    req.form({
      sender_id: process.env.DLT_SENDER_ID,
      message: process.env.YOUR_MESSAGE_ID,
      variables_values: `${variables_values}`,
      route: process.env.YOUR_ROUTE,
      numbers: `${contactNumber}`,
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });
  } catch (error) {
    next(error);
  }
};
