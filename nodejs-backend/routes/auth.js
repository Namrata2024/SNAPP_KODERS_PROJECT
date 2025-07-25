const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Mongoose User model
const User = require("../models/users"); // adjust path if needed

// Signup endpoint - body { username, password, name, age, ... other fields }

router.post("/signup", async (req, res) => {
  try {
    const { username, password, ...profileData } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(411).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      password: hashedPassword,
      ...profileData,
    });

    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    res.json({
      message: "User created successfully",
      token,
      userId: newUser._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while creating account" });
  }
});

// Signin endpoint - body { username, password }

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(411).json({ message: "Invalid username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed Password:", hashedPassword);

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(411).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      message: "User logged in",
      token,
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while logging in" });
  }
});

module.exports = router;
