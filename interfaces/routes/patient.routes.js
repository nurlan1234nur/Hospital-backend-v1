import {
  getOwnExaminations,
  listAllPatients,
} from "../controller/patient.controller.js";
import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";


const router = express.Router();

router.get(
  "/view",
  authenticateJWT,
  authorizeRole(["Admin", "MedicalStaff"]),
  listAllPatients
);

router.get(
  "/examinations",
  authenticateJWT,
  authorizeRole(["Patient"]),
  getOwnExaminations
);






export default router;
