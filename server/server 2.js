const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema and Model
const UserSchema = new mongoose.Schema({
  fullName: String,
  contact: String,
  email: String,
  address: String,
  linkedin: String,
  portfolio: String,
  password: String,
  objective: String,
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      graduationYear: String,
      relevantCoursework: [String],
    },
  ],
  workExperience: [
    {
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      responsibilities: [String],
      achievements: [String],
    },
  ],
  skills: [String],
  achievements: [String],
});

const User = mongoose.model("User", UserSchema);

// Routes
app.post("/api/users/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
