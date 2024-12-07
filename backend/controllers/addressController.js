const Address = require("../models/addressModel");

// Create or Update Address
exports.createAddress = async (req, res) => {
  const { name, phone, address, city, state, country, postalCode } = req.body;

  try {
    let userAddress = await Address.findOne({ user: req.user._id });

    if (userAddress) {
      // Update existing address
      userAddress = await Address.findOneAndUpdate(
        { user: req.user._id },
        { name, phone, address, city, state, country, postalCode },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Address updated successfully", userAddress });
    }

    // Create new address
    const newAddress = new Address({
      user: req.user._id,
      name,
      phone,
      address,
      city,
      state,
      country,
      postalCode,
    });

    await newAddress.save();
    res.status(201).json({ message: "Address saved successfully", newAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Address
exports.getAddress = async (req, res) => {
  try {
    const userAddress = await Address.findOne({ user: req.user._id });
    if (!userAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(userAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};