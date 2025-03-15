import express from "express";
import User from "./models.js";

const router = express.Router();

// Test Route
router.get("/health", (req, res) => {
  res.send("API is running...");
});

// Create a User
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
