const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = Schema(
  {
    banner: [
      {
        imgUrl: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const bannerModel = mongoose.model("banner", bannerSchema);
module.exports = bannerModel;
