const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
require("dotenv").config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { firstName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ firstName, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the correct path for email
    const user = await User.findOne({ "personalInfo.email": email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with user data and token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        fullName: user.personalInfo.fullName,
        email: user.personalInfo.email,
        contact: user.personalInfo.contact,
        address: user.personalInfo.address,
        linkedin: user.personalInfo.linkedin,
        portfolio: user.personalInfo.portfolio,
        education: user.education,
        workExperience: user.workExperience,
        skills: user.skills,
        projects: user.projects,
        certifications: user.certifications,
        achievements: user.achievements,
        languages: user.languages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// In your backend route handler
router.put("/update", async (req, res) => {
  try {
    const { id, ...updatedData } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error });
  }
});

module.exports = router;
