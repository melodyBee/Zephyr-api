const { Schema, model } = require("mongoose");

const ProductsSchema = new Schema({
  ProductsName: {
    type: String,
    unique: true,
    required: true,
  },
  ProductsImage: {
    type: String,
    required: true,
  },
  ProductsDescription: {
    type: String,
    required: true,
  },
  ProductsPrice: {
    type: String,
    required: true,
  },
  ProductsRatings: {
    type: String,
    required: true,
  },
});

const Products = model("products", ProductsSchema);
module.exports = Products;
