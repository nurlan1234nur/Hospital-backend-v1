import express from "express";
import { registerStaff } from "../controller/admin.controller.js";

const router = express.Router();

// Endpoint for admin to register medical staff
router.post("/medical-staff", registerStaff);

export default router;