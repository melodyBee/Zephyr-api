const Brands = require("./schema");
const { connect } = require("mongoose");
const addBrands = async (req, res) => {
  const { BrandsName, BrandsImage, BrandsDescription } = req.body;

  if (!BrandsName || !BrandsImage || !BrandsDescription) {
    return res.status(400).json({
      message: "Missing Required Fields",
    });
  }

  try {
    const checkExisting = await Brands.exists({ BrandsName });

    if (checkExisting) {
      return res.status(400).json({
        message: "Brands Already Exists",
      });
    }

    const newBrands = await Brands.create({
      BrandsName,
      BrandsImage,
      BrandsDescription,
    });
    return res.status(201).json({
      message: "Brands Created",
      Brands: newBrands,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const allBrands = await Brands.find();
    res.json({
      Brands: allBrands,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getBrandsByID = async (req, res) => {
  const { id } = req.params;

  try {
    const Brands = await Brands.findById(id);
    if (!Brands) {
      return res.status(404).json({
        message: "Brands not found",
      });
    }
    res.json({ Brands });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateBrands = async (req, res) => {
  const { id } = req.params;
  const { BrandsName, BrandsImage, BrandsDescription } = req.body;

  try {
    const Brands = await Brands.findByIdAndUpdate(
      id,
      {
        BrandsName,
        BrandsImage,
        BrandsDescription,
      },
      { new: true }
    );

    if (!Brands) {
      return res.status(404).json({
        message: "Brands not found",
      });
    }

    res.json({
      message: "Brands Updated",
      Brands,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteBrands = async (req, res) => {
  const { id } = req.params;

  try {
    const Brands = await Brands.findByIdAndDelete(id);
    if (!Brands) {
      return res.status(404).json({
        message: "Brands not found",
      });
    }
    res.json({
      message: "Brands Deleted Successfully",
      Brands,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllBrands,
  getBrandsByID,
  updateBrands,
  deleteBrands,
  addBrands,
};
