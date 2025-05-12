import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

import {
  createAllergy,
  getMyAllergies,
  updateMyAllergyById,
  deleteMyAllergyById,
  createMyAllergy,
  deleteAllergyById,
  getAllergyById,
  getPatientAllergyList,
  updateAllergyById,
} from "../controller/allergy.controller.js";
const router = express.Router();
router.use(authenticateJWT);

// Patient-specific routes for managing their own allergies
router.get("/my/allergies", authorizeRole(["Patient"]), getMyAllergies);

router.post("/my/allergies", authorizeRole(["Patient"]), createMyAllergy);

router.put(
  "/my/allergies/:id",
  authorizeRole(["Patient"]),
  updateMyAllergyById
);

router.delete(
  "/my/allergies/:id",
  authorizeRole(["Patient"]),
  deleteMyAllergyById
);

//=====================ALLERGY==========================
router.post(
  "/",
  authorizeRole(["MedicalStaff", "Admin"]),
  createAllergy
);

router.get(
  "/:id",
  authorizeRole(["MedicalStaff", "Admin", "Patient"]),
  getAllergyById
);

router.put(
  "/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  updateAllergyById
);

router.delete(
  "/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  deleteAllergyById
);

// Get all allergies for a specific patient (medical staff and admin)
router.get(
  "/patient/allergy/:patientId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientAllergyList
);

export default router;
