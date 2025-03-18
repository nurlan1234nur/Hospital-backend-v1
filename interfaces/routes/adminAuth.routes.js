import express from "express";
import { signUpAdmin } from "../controller/adminAuth.controller.js";

const router = express.Router();

router.post("/signup", signUpAdmin);

export default router;
