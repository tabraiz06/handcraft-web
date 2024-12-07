// backend/controllers/productController.js
const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Get single product by ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, price, imageUrl, category, stock } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  getProducts,
  createProduct,
  getProductById,

};
