// backend/routes/adminRoutes.js
const express = require("express");
const {
  getAllUsers,
  getAllOrders,
  addProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/users").get(protect, adminOnly, getAllUsers);
router.route("/orders").get(protect, adminOnly, getAllOrders);
router
  .route("/products")
  .get(protect, adminOnly, getAdminProducts)
  .post(protect, adminOnly, addProduct)
  
  router.route("/products/:id")
  .put(protect,adminOnly,updateProduct)
  .delete(protect,adminOnly,deleteProduct)

  

module.exports = router;
