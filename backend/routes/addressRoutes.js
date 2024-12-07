const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Middleware to authenticate users

const { createAddress, getAddress } = require("../controllers/addressController");

// Create or Update Address
router.post("/address", protect, createAddress);

// Get Address
router.get("/address", protect, getAddress);

module.exports = router;
