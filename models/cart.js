const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema(
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
        size: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
