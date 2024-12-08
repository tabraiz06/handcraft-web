const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel"); // Assuming you use a Contact model for storing contact submissions
const { protect, adminOnly } = require("../middleware/authMiddleware");

// POST: Save contact submissions
router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const contact = new Contact({ name, email, phone, message });
    await contact.save();
    res.status(200).json({ message: "Thank you for contacting us!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res
      .status(500)
      .json({ message: "Failed to save contact message. Try again later." });
  }
});

// GET: Fetch all contact submissions (admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ message: "Failed to fetch contact messages." });
  }
});

module.exports = router;
