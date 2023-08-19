const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductsByID,
  updateProducts,
  deleteProducts,
  addProducts,
} = require("./controller");

// getAllProducts
router.get("/products", getAllProducts);

// addProducts
router.post("/addProducts", addProducts);

// delete product by ID
router.delete("/delete-product/:id", deleteProducts);

// update product by ID
router.put("/update-product/:id", updateProducts);

// get product by ID
router.get("/product/:id", getProductsByID);

module.exports = router;
