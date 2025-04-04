import { getOwnExaminations, listAllPatients } from "../controller/patient.controller.js";
import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";
import {
  createAllergy,
  getAllergyById,
  updateAllergyById,
  deleteAllergyById,
  getPatientAllergyList,
  getMyAllergies,
  updateMyAllergyById,
  deleteMyAllergyById,
  createMyAllergy,
  createChronicDisease,
  getChronicDiseaseById,
  updateChronicDiseaseById,
  deleteChronicDiseaseById,
  getPatientChronicDiseaseList,
  getMyChronicDiseases,
  createMyChronicDisease,
  updateMyChronicDiseaseById,
  deleteMyChronicDiseaseById,
} from "../controller/patient.controller.js";
 


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

//ALLERGY
router.post(
  "/allergy",
  authorizeRole(["MedicalStaff", "Admin"]),
  createAllergy
);

router.get(
  "/allergy/:id",
  authorizeRole(["MedicalStaff", "Admin", "Patient"]),
  getAllergyById
);

router.put(
  "/allergy/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  updateAllergyById
);

router.delete(
  "/allergy/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  deleteAllergyById
);

// Get all allergies for a specific patient (medical staff and admin)
router.get(
  "/patient/allergy/:patientId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientAllergyList
);

// Patient-specific routes for managing their own allergies
router.get(
  "/my/allergies",
  authorizeRole(["Patient"]),
  getMyAllergies
);

router.post(
  "/my/allergies",
  authorizeRole(["Patient"]),
  createMyAllergy
);

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

//CHRONIC DISEASE
router.post(
  "/chrodis",
  authorizeRole(["MedicalStaff", "Admin"]),
  createChronicDisease
);

router.get(
  "/chrodis/:id",
  authorizeRole(["MedicalStaff", "Admin", "Patient"]),
  getChronicDiseaseById
);

router.put(
  "/chrodis/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  updateChronicDiseaseById
);

router.delete(
  "/chrodis/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  deleteChronicDiseaseById
);

// Get all chronic diseases for a specific patient (medical staff and admin)
router.get(
  "/patient/chrodis/:patientId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientChronicDiseaseList
);

// Patient-specific routes for managing their own chronic diseases
router.get(
  "/my/diseases",
  authorizeRole(["Patient"]),
  getMyChronicDiseases
);

router.post(
  "/my/diseases",
  authorizeRole(["Patient"]),
  createMyChronicDisease
);

router.put(
  "/my/diseases/:id",
  authorizeRole(["Patient"]),
  updateMyChronicDiseaseById
);

router.delete(
  "/my/diseases/:id",
  authorizeRole(["Patient"]),
  deleteMyChronicDiseaseById
);







export default router;
