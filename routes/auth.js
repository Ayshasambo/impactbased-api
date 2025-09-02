const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateApiKey = require("../utils/generateApiKey");

const router = express.Router();

// Register new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate API Key
    const apiKey = generateApiKey();

    // Save user to DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      api_key: apiKey,
    });

    res.status(201).json({
      message: "User registered successfully",
      apiKey: user.api_key,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

