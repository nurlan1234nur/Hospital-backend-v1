import express from "express";
const router = express.Router();

router.get("/health", (req, res) => {
  res.send("API is running...");
});

export default router;
