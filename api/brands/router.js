const express = require("express");
const router = express.Router();
const {
  getAllBrands,
  getBrandsByID,
  updateBrands,
  deleteBrands,
  addBrands,
} = require("./controller");

// getAllBrands
router.get("/Brands", getAllBrands);

// addBrands
router.post("/addBrands", addBrands);

// delete brand by ID
router.delete("/delete-brands/:id", deleteBrands);

// update brand by ID
router.put("/update-brand/:id", updateBrands);

// get brand by ID
router.get("/brand/:id", getBrandsByID);

module.exports = router;
