import express from "express";
import { registerMedicalStaff } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup/medical-staff", registerMedicalStaff);

export default router;
