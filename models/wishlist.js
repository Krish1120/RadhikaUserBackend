const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    products: [
      {
        product: {
          type: Object,
        },
      },
    ],
  },
  { timestamps: true }
);

const wishlistModel = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlistModel;
