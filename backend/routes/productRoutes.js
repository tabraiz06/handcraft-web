// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(createProduct);
router.get('/:id', getProductById); // Fetch single product by ID


module.exports = router;
