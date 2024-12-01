// backend/routes/userRoutes.js
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login an existing user
router.post("/login", loginUser);

// Get and update user profile (protected)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
