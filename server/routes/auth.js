// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const router = express.Router();

// // Middleware for Admin Verification
// const verifyAdmin = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res
//       .status(403)
//       .json({ message: "Access denied: No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return res.status(403).json({ message: "Access denied: Admins only" });
//     }
//     req.user = decoded; // Attach user info to the request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// // User Registration Endpoint
// router.post("/register", async (req, res) => {
//   const { email, password, role, fullName } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ "personalInfo.email": email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create a new user
//     const newUser = new User({
//       personalInfo: { email, fullName },
//       password,
//       role: role || "user", // Default to "user"
//     });

//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // User Login Endpoint
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ "personalInfo.email": email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       { id: user._id, email: user.personalInfo.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ token, user });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Example Admin-Only Route
// router.get("/admin-data", verifyAdmin, async (req, res) => {
//   res.status(200).json({ message: "Welcome, Admin!" });
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Middleware for Admin Verification
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("Access denied: No token provided");
    return res
      .status(403)
      .json({ message: "Access denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid or expired token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// User Registration Endpoint
router.post("/register", async (req, res) => {
  const { email, password, role, fullName } = req.body;
  console.log("Registering user with email:", email);

  try {
    const existingUser = await User.findOne({ "personalInfo.email": email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      personalInfo: { email, fullName },
      password,
      role: role || "user",
    });

    await newUser.save();
    console.log("User registered successfully:", email);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User Login Endpoint
router.post("/login", async (req, res) => {
  router.post("/login", async (req, res) => {
    console.log("Login route hit with:", req.body);
    // Rest of the login logic
  });

  const { email, password } = req.body;
  console.log("Login request received:", { email });

  try {
    const user = await User.findOne({ "personalInfo.email": email });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch for email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.personalInfo.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("JWT generated for email:", email);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        fullName: user.personalInfo.fullName,
        email: user.personalInfo.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Example Admin-Only Route
router.get("/admin-data", verifyAdmin, async (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});

module.exports = router;
