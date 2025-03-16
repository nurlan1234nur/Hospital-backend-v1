import express from "express";
import { registerMedicalStaff } from "../auth.controller.js";

const router = express.Router();

router.post("/signup/medical-staff", registerMedicalStaff);

export default router;
