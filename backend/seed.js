// backend/seed.js
const mongoose = require("mongoose");
const Product = require("./models/Product"); // Import your Product model
const dotenv = require("dotenv");

dotenv.config();



// Dummy products data
const products = [
  {
    name: "Handcrafted Wooden Chair",
    description:
      "A beautifully crafted wooden chair made from sustainable wood.",
    price: 89.99,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2021/5/RO/OE/IO/118697776/wooden-handicraft-products-500x500.jpg",
    ],
    stock: 10,
  },
  {
    name: "Rustic Coffee Table",
    description:
      "A rustic coffee table that adds character to any living room.",
    price: 149.99,
    images: [
      "https://5.imimg.com/data5/PY/XZ/PE/ANDROID-17379288/product-jpeg-500x500.jpg",
    ],
    stock: 5,
  },
  {
    name: "Wooden Bookshelf",
    description: "A spacious bookshelf to organize your books and decor.",
    price: 199.99,
    images: [
      "data:image/jpeg;base64,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",
    ],
    stock: 7,
  },
];

// Seed the database
const seedProducts = async () => {
  // await connectDB();
  await Product.deleteMany(); // Clear existing products
  const createdProducts = await Product.insertMany(products);
  // console.log("Products seeded:", createdProducts);
 
};

module.exports= seedProducts
