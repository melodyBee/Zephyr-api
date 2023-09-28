const Products = require("./schema");

const addProducts = async (req, res) => {
  const {
    ProductsName,
    ProductsImage,
    ProductsDescription,
    ProductsPrice,
    ProductsRatings,
  } = req.body;

  if (
    !ProductsName ||
    !ProductsImage ||
    !ProductsDescription ||
    !ProductsPrice ||
    !ProductsRatings
  ) {
    return res.status(400).json({
      message: "Missing Required Fields",
    });
  }

  try {
    const checkExisting = await Products.exists({ ProductsName });

    if (checkExisting) {
      return res.status(400).json({
        message: "Product Already Exists",
      });
    }

    const newProduct = await Products.create({
      ProductsName,
      ProductsImage,
      ProductsRatings,
      ProductsPrice,
      ProductsDescription,
    });
    return res.status(201).json({
      message: "Product Created",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.json({
      Products: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getProductsByID = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const {
    ProductsName,
    ProductsImage,
    ProductsDescription,
    ProductsPrice,
    ProductsRatings,
  } = req.body;

  try {
    const product = await Products.findByIdAndUpdate(
      id,
      {
        ProductsName,
        ProductsImage,
        ProductsDescription,
        ProductsPrice,
        ProductsRatings,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product Updated",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.json({
      message: "Product Deleted Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductsByID,
  updateProducts,
  deleteProducts,
  addProducts,
};
