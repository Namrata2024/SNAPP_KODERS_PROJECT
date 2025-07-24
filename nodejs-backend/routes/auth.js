const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "superlongandsecuresecretkey123!@#%&*()_+"; // move to .env

// SIGN-UP
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: "Username exists" });

    const newUser = await User.create({ username, password });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
});

// SIGN-IN
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Signin failed" });
  }
});

module.exports = router;
