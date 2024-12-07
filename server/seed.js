// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const User = require("./models/userModel");
// require("dotenv").config();

// const seedUsers = async () => {
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const hashedPassword1 = await bcrypt.hash("alice123", 10);
//   const hashedPassword2 = await bcrypt.hash("bob123", 10);
//   const hashedPassword3 = await bcrypt.hash("cathy123", 10);
//   const hashedPassword4 = await bcrypt.hash("david123", 10);
//   const hashedPassword5 = await bcrypt.hash("emma123", 10);

//   await User.insertMany([
//     {
//       personalInfo: {
//         fullName: "Alice Smith",
//         contact: "+1-123-456-7890",
//         email: "alice@example.com",
//         address: "123 Main St, Boston, MA",
//         linkedin: "linkedin.com/in/alicesmith",
//         portfolio: "alicesmith.dev",
//       },
//       password: hashedPassword1,
//       objective: "To leverage my skills in software engineering.",
//       education: [
//         {
//           institution: "MIT",
//           degree: "B.Sc. in Computer Science",
//           fieldOfStudy: "Software Engineering",
//           graduationYear: 2023,
//           relevantCoursework: ["Data Structures", "Algorithms"],
//         },
//       ],
//       workExperience: [
//         {
//           company: "Google",
//           position: "Software Engineer",
//           startDate: new Date("2021-01-01"),
//           endDate: new Date("2023-12-31"),
//           responsibilities: ["Developed scalable APIs"],
//           achievements: ["Reduced server costs by 15%"],
//         },
//       ],
//       skills: ["Python", "React"],
//       achievements: ["Hackathon Winner 2022"],
//     },
//     {
//       personalInfo: {
//         fullName: "Bob Johnson",
//         contact: "+1-987-654-3210",
//         email: "bob@example.com",
//         linkedin: "linkedin.com/in/bobjohnson",
//       },
//       password: hashedPassword2,
//       objective:
//         "To excel in data analytics and contribute to business decision-making.",
//       education: [
//         {
//           institution: "Stanford University",
//           degree: "M.Sc. in Data Science",
//           fieldOfStudy: "Data Analytics",
//           graduationYear: 2022,
//         },
//       ],
//       workExperience: [
//         {
//           company: "Facebook",
//           position: "Data Analyst",
//           startDate: "2022-02-01",
//           responsibilities: [
//             "Analyzed user behavior",
//             "Generated data-driven insights",
//           ],
//           achievements: ["Improved ad revenue by 10%"],
//         },
//       ],
//       skills: ["SQL", "Python", "Tableau"],
//       languages: [{ language: "English", proficiency: "Fluent" }],
//     },
//     {
//       personalInfo: {
//         fullName: "Cathy Brown",
//         contact: "+1-555-555-5555",
//         email: "cathy@example.com",
//         address: "45 Maple St, New York, NY",
//       },
//       password: hashedPassword3,
//       objective:
//         "To utilize my UX design expertise to enhance user experiences.",
//       education: [
//         {
//           institution: "Parsons School of Design",
//           degree: "B.A. in Design",
//           fieldOfStudy: "User Experience Design",
//           graduationYear: 2020,
//         },
//       ],
//       skills: ["Figma", "Adobe XD", "Sketch"],
//       projects: [
//         {
//           title: "Mobile App Redesign",
//           description: "Revamped UI for a fintech app.",
//           technologies: ["Figma"],
//           outcome: "Increased user retention by 30%",
//         },
//       ],
//       languages: [
//         { language: "English", proficiency: "Fluent" },
//         { language: "French", proficiency: "Beginner" },
//       ],
//     },
//     {
//       personalInfo: {
//         fullName: "David Lee",
//         contact: "+1-111-222-3333",
//         email: "david@example.com",
//       },
//       password: hashedPassword4,
//       objective:
//         "To apply machine learning expertise in solving business challenges.",
//       education: [
//         {
//           institution: "Carnegie Mellon University",
//           degree: "M.Sc. in Machine Learning",
//           graduationYear: 2021,
//         },
//       ],
//       workExperience: [
//         {
//           company: "Tesla",
//           position: "AI Engineer",
//           startDate: "2021-07-01",
//           endDate: "2023-07-01",
//           responsibilities: ["Developed AI models for autonomous vehicles"],
//         },
//       ],
//       skills: ["TensorFlow", "PyTorch", "Deep Learning"],
//       certifications: [
//         {
//           name: "Certified Machine Learning Specialist",
//           issuer: "Google",
//           dateIssued: "2021-09-01",
//         },
//       ],
//     },
//     {
//       personalInfo: {
//         fullName: "Emma Green",
//         contact: "+1-444-555-6666",
//         email: "emma@example.com",
//       },
//       password: hashedPassword5,
//       objective: "To lead innovative marketing campaigns in the tech industry.",
//       workExperience: [
//         {
//           company: "Apple",
//           position: "Marketing Manager",
//           startDate: "2019-03-01",
//           responsibilities: ["Designed marketing strategies", "Managed teams"],
//         },
//       ],
//       skills: ["SEO", "Content Marketing", "Google Ads"],
//     },
//   ]);

//   console.log("Users seeded!");
//   mongoose.disconnect();
// };

// seedUsers();

// const seedUsers = async () => {
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   // Clear the existing collection
//   await User.deleteMany({});
//   console.log("Users collection cleared");

//   const hashedPassword1 = await bcrypt.hash("alice123", 10);
//   const hashedPassword2 = await bcrypt.hash("bob123", 10);
//   const hashedPassword3 = await bcrypt.hash("cathy123", 10);
//   const hashedPassword4 = await bcrypt.hash("david123", 10);
//   const hashedPassword5 = await bcrypt.hash("emma123", 10);

//   await User.insertMany([
//     {
//       personalInfo: {
//         fullName: "Alice Smith",
//         contact: "+1-123-456-7890",
//         email: "alice@example.com",
//         address: "123 Main St, Boston, MA",
//         linkedin: "linkedin.com/in/alicesmith",
//         portfolio: "alicesmith.dev",
//       },
//       password: hashedPassword1,
//       objective: "To leverage my skills in software engineering.",
//       education: [
//         {
//           institution: "MIT",
//           degree: "B.Sc. in Computer Science",
//           fieldOfStudy: "Software Engineering",
//           graduationYear: 2023,
//           relevantCoursework: ["Data Structures", "Algorithms"],
//         },
//       ],
//       workExperience: [
//         {
//           company: "Google",
//           position: "Software Engineer",
//           startDate: new Date("2021-01-01"),
//           endDate: new Date("2023-12-31"),
//           responsibilities: ["Developed scalable APIs"],
//           achievements: ["Reduced server costs by 15%"],
//         },
//       ],
//       skills: ["Python", "React"],
//       achievements: ["Hackathon Winner 2022"],
//     },
//     // Other user objects...
//   ]);

//   console.log("Users seeded!");
//   mongoose.disconnect();
// };

// seedUsers();
