const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./userModel");
require("dotenv").config();

const seedUsers = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Hash the passwords
    const hashedPasswordAlice = await bcrypt.hash("password123", 10);
    const hashedPasswordBob = await bcrypt.hash("password456", 10);

    // Insert users into the database
    await User.insertMany([
      {
        firstName: "Alice",
        email: "alice@example.com",
        password: hashedPasswordAlice,
        createdAt: new Date(),
      },
      {
        firstName: "Bob",
        email: "bob@example.com",
        password: hashedPasswordBob,
        createdAt: new Date(),
      },
    ]);

    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
};

seedUsers();
