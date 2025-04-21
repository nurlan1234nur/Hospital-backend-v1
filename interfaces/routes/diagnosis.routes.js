import express from "express";

import {
    createDiagnosis,
    getDiagnosisById,
    updateDiagnosisById,
    deleteDiagnosisById,
    getPatientDiagnosisList,
    getMyDiagnoses,
  } from "../controller/diagnosis.controller.js";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

//middleware
router.use(authenticateJWT);

//=====================DIAGNOSIS========================
router.post("/diagnosis", authorizeRole(["MedicalStaff"]), createDiagnosis);

// Get a specific diagnosis by ID (medical staff and the diagnosed patient)
router.get(
  "/diagnosis/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  getDiagnosisById
);

// Update an existing diagnosis (medical staff only)
router.put(
  "/diagnosis/:id",
  authorizeRole(["MedicalStaff"]),
  updateDiagnosisById
);

// Delete a diagnosis (medical staff only)
router.delete(
  "/diagnosis/:id",
  authorizeRole(["MedicalStaff"]),
  deleteDiagnosisById
);

// Get all diagnoses for a specific patient (for medical staff and the patient themselves)
router.get(
  "/patient/diagnosis/:patientId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientDiagnosisList
);

// Get all my diagnoses (for patients to see their own diagnoses or staff to see diagnoses they created)
router.get("/my-diagnoses", authorizeRole(["MedicalStaff"]), getMyDiagnoses);

router.get(
    "/my-diagnoses",
    authenticateJWT,
    authorizeRole(["Patient"]),
    getMyDiagnoses
  );
  
  // Get a specific diagnosis by ID (patient can only view their own diagnoses)
  router.get(
    "/diagnosis/:id",
    authenticateJWT,
    authorizeRole(["Patient"]),
    getDiagnosisById
  );
  

export default router;
