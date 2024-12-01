// backend/controllers/adminController.js
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order"); // Assuming an Order model exists

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// Get all orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");
  res.json(orders);
};

// Add, update, and delete products
const addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true }
  );
  res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.body.id);
  res.json({ message: "Product deleted" });
};

module.exports = {
  getAllUsers,
  getAllOrders,
  addProduct,
  updateProduct,
  deleteProduct,
};
