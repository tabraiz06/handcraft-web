// backend/routes/adminRoutes.js
const express = require("express");
const {
  getAllUsers,
  getAllOrders,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/users").get(protect, adminOnly, getAllUsers);
router.route("/orders").get(protect, adminOnly, getAllOrders);
router
  .route("/products")
  .post(protect, adminOnly, addProduct)
  .put(protect, adminOnly, updateProduct)
  .delete(protect, adminOnly, deleteProduct);

module.exports = router;
