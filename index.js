import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import AuthRouter from "./routes/auth.routes.js";
import HealthRouter from "./routes/health.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Missing MONGO_URI! Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());

app.use("/api/v1", AuthRouter);
app.use("/api/v1", HealthRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
