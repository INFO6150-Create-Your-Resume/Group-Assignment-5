// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const templateRoutes = require("./routes/templateRoutes");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Use Template Routes
// app.use("/api/templates", templateRoutes);

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // Schema and Model
// const UserSchema = new mongoose.Schema({
//   fullName: String,
//   contact: String,
//   email: String,
//   address: String,
//   linkedin: String,
//   portfolio: String,
//   password: String,
//   objective: String,
//   education: [
//     {
//       institution: String,
//       degree: String,
//       fieldOfStudy: String,
//       graduationYear: String,
//       relevantCoursework: [String],
//     },
//   ],
//   workExperience: [
//     {
//       company: String,
//       position: String,
//       startDate: Date,
//       endDate: Date,
//       responsibilities: [String],
//       achievements: [String],
//     },
//   ],
//   skills: [String],
//   achievements: [String],
// });

// const User = mongoose.model("User", UserSchema);

// // Routes
// app.post("/api/users/register", async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering user", error });
//   }
// });

// // Create a new template
// app.post("/api/templates", async (req, res) => {
//   try {
//     const template = new Template(req.body);
//     await template.save();
//     res.status(201).json({ message: "Template added successfully!", template });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding template", error });
//   }
// });

// // Get all templates
// app.get("/api/templates", async (req, res) => {
//   try {
//     const templates = await Template.find();
//     res.status(200).json(templates);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching templates", error });
//   }
// });

// // Delete a template
// app.delete("/api/templates/:id", async (req, res) => {
//   try {
//     await Template.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Template deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting template", error });
//   }
// });

// // update template
// app.put("/api/templates/:id", async (req, res) => {
//   try {
//     const updatedTemplate = await Template.findByIdAndUpdate(
//       req.params.id,
//       { ...req.body, updatedAt: Date.now() },
//       { new: true }
//     );
//     res
//       .status(200)
//       .json({ message: "Template updated successfully!", updatedTemplate });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating template", error });
//   }
// });

// // filter templates
// app.get("/api/templates/filter", async (req, res) => {
//   const { category, isActive } = req.query;
//   const filter = {};
//   if (category) filter.category = category;
//   if (isActive !== undefined) filter.isActive = isActive;

//   try {
//     const templates = await Template.find(filter);
//     res.status(200).json(templates);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching filtered templates", error });
//   }
// });

// // Login Route
// // app.post("/api/login", async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // Find the user by email
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(404).json({ message: "Email not found" });
// //     }

// //     // Verify the password
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(401).json({ message: "Incorrect password" });
// //     }

// //     // Generate JWT
// //     const token = jwt.sign(
// //       { id: user._id, email: user.email },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1h" }
// //     );

// app.post("/api/login", async (req, res) => {
//   console.log("Login endpoint hit"); // Debug log

//   const { email, password } = req.body;
//   console.log("Request body:", req.body); // Debug log

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "Email not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         fullName: user.fullName,
//         email: user.email,
//         contact: user.contact,
//         address: user.address,
//         linkedin: user.linkedin,
//         portfolio: user.portfolio,
//         education: user.education,
//         workExperience: user.workExperience,
//         skills: user.skills,
//         achievements: user.achievements,
//       },
//     });
//   } catch (error) {
//     console.error("Error during login:", error); // Debug log
//     res.status(500).json({ message: "Error during login", error });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("./models/userModel");
// const router = express.Router();

// const app = express();

// // Middleware for Admin Verification
// const verifyAdmin = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     console.log("Access denied: No token provided");
//     return res
//       .status(403)
//       .json({ message: "Access denied: No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded token:", decoded);
//     if (decoded.role !== "admin") {
//       return res.status(403).json({ message: "Access denied: Admins only" });
//     }
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Invalid or expired token:", error);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// // User Registration Endpoint
// router.post("/register", async (req, res) => {
//   const { email, password, role, fullName } = req.body;
//   console.log("Registering user with email:", email);

//   try {
//     const existingUser = await User.findOne({ "personalInfo.email": email });
//     if (existingUser) {
//       console.log("User already exists:", email);
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const newUser = new User({
//       personalInfo: { email, fullName },
//       password,
//       role: role || "user",
//     });

//     await newUser.save();
//     console.log("User registered successfully:", email);
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // User Login Endpoint
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Login request received:", { email });

//   try {
//     const user = await User.findOne({ "personalInfo.email": email });
//     console.log("User found:", user);

//     if (!user) {
//       console.log("User not found for email:", email);
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("Password match result:", isMatch);

//     if (!isMatch) {
//       console.log("Password mismatch for email:", email);
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.personalInfo.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     console.log("JWT generated for email:", email);
//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         fullName: user.personalInfo.fullName,
//         email: user.personalInfo.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Example Admin-Only Route
// router.get("/admin-data", verifyAdmin, async (req, res) => {
//   res.status(200).json({ message: "Welcome, Admin!" });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = router;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");

const app = express();
const router = express.Router();

// Middleware
app.use(express.json()); // For parsing JSON
app.use(cors()); // Enable cross-origin requests

// Admin Verification Middleware
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// User Registration Endpoint
router.post("/register", async (req, res) => {
  const { email, password, role, fullName } = req.body;

  try {
    const existingUser = await User.findOne({ "personalInfo.email": email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      personalInfo: { email, fullName },
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// User Login Endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ "personalInfo.email": email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.personalInfo.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        fullName: user.personalInfo.fullName,
        email: user.personalInfo.email,
        role: user.personalInfo.role,
        contact: user.personalInfo.contact,
        address: user.personalInfo.address,
        linkedin: user.personalInfo.linkedin,
        portfolio: user.personalInfo.portfolio,
        education: user.education,
        workExperience: user.workExperience,
        skills: user.skills,
        achievements: user.achievements,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Example Admin-Only Route
router.get("/admin-data", verifyAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});

// Mount Router
app.use("/api/users", router);

// Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
