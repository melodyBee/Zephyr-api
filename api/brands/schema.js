const { Schema, model } = require("mongoose");

const BrandSchema = new Schema({
  BrandName: {
    type: String,
    required: true,
  },
  BrandImage: {
    type: String,
    required: true,
  },
  BrandsDescription: {
    type: String,
    required: false,
  },
});
const Brand = model("brand", BrandSchema);
module.exports = { Brand };
