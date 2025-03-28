import express from "express";
import {
  createExamination,
  getExaminationById,
  updateExaminationById,
  deleteExaminationById,
  getPatientExaminationHistory
} from "../controller/medicalstaff.controller.js";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

//middleware
router.use(authenticateJWT);

//examination
router.post(
  "/exam/",
  authorizeRole(["MedicalStaff"]),
  createExamination
);

router.get(
  "/exam/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  getExaminationById
);

router.put(
  "/exam/:id",
  authorizeRole(["MedicalStaff"]),
  updateExaminationById
);

router.delete(
  "/exam/:id",
  authorizeRole(["MedicalStaff"]),
  deleteExaminationById
);

// Get all examinations for a specific patient
router.get(
  "/patient/exam/:patientId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientExaminationHistory
);

export default router;