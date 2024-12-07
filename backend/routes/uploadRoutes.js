const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the directory exists or create it
const ensureDirectoryExistence = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Set up multer storage to save files in the frontend's public/images folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const publicPath = path.join(__dirname, "../../frontend/public/images");
    ensureDirectoryExistence(publicPath); // Ensure the directory exists
    cb(null, publicPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Route to upload images
router.post("/", upload.array("images", 5), (req, res) => {
   
  if (req.files) {
    const filePaths = req.files.map((file) => `/images/${file.filename}`);
    res.json({
      message: "Images uploaded successfully",
      filePaths,
    });
  } else {
    res.status(400).json({ message: "Failed to upload images" });
  }
});

module.exports = router;
