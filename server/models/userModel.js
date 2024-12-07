// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//   personalInfo: {
//     fullName: { type: String, required: true },
//     contact: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     address: { type: String },
//     linkedin: { type: String },
//     portfolio: { type: String },
//   },
//   password: { type: String, required: true },
//   objective: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   education: [
//     {
//       institution: String,
//       degree: String,
//       fieldOfStudy: String,
//       graduationYear: Number,
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
//   projects: [
//     {
//       title: String,
//       description: String,
//       technologies: [String],
//       outcome: String,
//     },
//   ],
//   certifications: [
//     {
//       name: String,
//       issuer: String,
//       dateIssued: Date,
//       expiry: Date,
//     },
//   ],
//   achievements: [String],
//   languages: [
//     {
//       language: String,
//       proficiency: String, // e.g., Beginner, Intermediate, Fluent, could change to dropdown latter
//     },
//   ],
//   references: [
//     {
//       name: String,
//       relationship: String,
//       contact: String,
//     },
//   ],
//   createdAt: { type: Date, default: Date.now },
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next(); // Skip if password is not modified
//   this.password = await bcrypt.hash(this.password, 10); // Hash password with salt rounds = 10
//   next();
// });

// module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//   personalInfo: {
//     fullName: { type: String, required: true },
//     contact: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     address: { type: String },
//     linkedin: { type: String },
//     portfolio: { type: String },
//   },
//   password: { type: String, required: true },
//   objective: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   role: { type: String, default: "user" }, // Role field with default value "user"
//   education: [
//     {
//       institution: String,
//       degree: String,
//       fieldOfStudy: String,
//       graduationYear: Number,
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
//   projects: [
//     {
//       title: String,
//       description: String,
//       technologies: [String],
//       outcome: String,
//     },
//   ],
//   certifications: [
//     {
//       name: String,
//       issuer: String,
//       dateIssued: Date,
//       expiry: Date,
//     },
//   ],
//   achievements: [String],
//   languages: [
//     {
//       language: String,
//       proficiency: String, // e.g., Beginner, Intermediate, Fluent
//     },
//   ],
//   references: [
//     {
//       name: String,
//       relationship: String,
//       contact: String,
//     },
//   ],
// });

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  personalInfo: {
    fullName: String,
    contact: String,
    email: { type: String, unique: true, required: true },
    address: String,
    linkedin: String,
    portfolio: String,
  },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      graduationYear: Number,
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
  projects: [
    {
      title: String,
      description: String,
      technologies: [String],
      outcome: String,
    },
  ],
  certifications: [
    {
      name: String,
      issuer: String,
      dateIssued: Date,
    },
  ],
  achievements: [String],
  languages: [
    {
      language: String,
      proficiency: String,
    },
  ],
});

// Pre-save middleware to hash passwords
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  console.log("Hashing password for user:", this.personalInfo.email);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
