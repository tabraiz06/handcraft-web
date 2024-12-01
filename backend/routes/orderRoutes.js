// backend/routes/orderRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// Route to create a new order
router.post("/", protect, createOrder);

// Route to get all orders for the admin
router.get("/", protect, getOrders);

// Route to get a specific order by ID
router.get("/:id", protect, getOrderById);

// Route to update an order's status
router.put("/:id", protect, updateOrderStatus);

module.exports = router;
