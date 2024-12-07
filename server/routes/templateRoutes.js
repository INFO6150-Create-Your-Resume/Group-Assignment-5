const express = require("express");
const { verifyAdmin } = require("../middleware/authMiddleware");
const Template = require("../models/Template");

const router = express.Router();

// Public: Get all templates
router.get("/", async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching templates", error });
  }
});

// Admin-Only: Add a template
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const newTemplate = new Template(req.body);
    await newTemplate.save();
    res
      .status(201)
      .json({ message: "Template added successfully!", template: newTemplate });
  } catch (error) {
    res.status(500).json({ message: "Error adding template", error });
  }
});

module.exports = router;
