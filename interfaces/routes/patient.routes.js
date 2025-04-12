import { getOwnExaminations, listAllPatients } from "../controller/patient.controller.js";
import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";
import {
  getMyAllergies,
  updateMyAllergyById,
  deleteMyAllergyById,
  createMyAllergy,
  getMyChronicDiseases,
  createMyChronicDisease,
  updateMyChronicDiseaseById,
  deleteMyChronicDiseaseById,
} from "../controller/patient.controller.js";
import { getDiagnosisById, getExaminationDiagnosisList, getMyDiagnoses, getMyLatestVitalSigns, getMyPrescribedGuides, getMyPrescribedMeds, getMyPrescriptions, getMyVitalSigns, getPatientVitalSignsByDateRange, getPrescribedGuideById, getPrescribedMedById, getPrescriptionById, getPrescriptionGuidesList, getPrescriptionMedsList, getVitalSignsById } from "../controller/medicalstaff.controller.js";
 


const router = express.Router();
router.use(authenticateJWT);

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




//VITAL SIGNS
router.get(
  "/vitalsigns/:id",
  authorizeRole(["Patient"]),
  getVitalSignsById
);

router.get(
  "/vitalsigns/my/recorded",
  authorizeRole(["Patient"]),
  getMyVitalSigns
);

router.get(
  "/vitalsigns/my/latest",
  authorizeRole(["Patient"]),
  getMyLatestVitalSigns
  
);

router.get(
  "/vitalsigns/my/daterange",
  authorizeRole(["Patient"]),
  (req, res, next) => {
    req.params.patientId = req.user.id;
    next();
  },
  getPatientVitalSignsByDateRange
);





//DIAGNOSIS
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

// Get all diagnoses for a specific examination (patient can only view their own examinations)
router.get(
  "/examination/:examinationId/diagnoses",
  authenticateJWT,
  authorizeRole(["Patient"]),
  getExaminationDiagnosisList
);


//===================== PATIENT PRESCRIPTIONS =====================
// Get all prescriptions for the logged-in patient
router.get(
  "/my-prescriptions",
  authorizeRole(["Patient"]),
  getMyPrescriptions
);

// Get a specific prescription by ID
router.get(
  "/prescription/:id",
  authorizeRole(["Patient"]),
  getPrescriptionById
);

//===================== PATIENT MEDICATIONS =====================
// Get all medications for the logged-in patient
router.get(
  "/my-medications",
  authorizeRole(["Patient"]),
  getMyPrescribedMeds
);

// Get a specific medication by ID
router.get(
  "/medication/:id",
  authorizeRole(["Patient"]),
  getPrescribedMedById
);

// Get all medications for a specific prescription
router.get(
  "/prescription/:prescriptionId/medications",
  authorizeRole(["Patient"]),
  getPrescriptionMedsList
);

//===================== PATIENT GUIDES =====================
// Get all guides for the logged-in patient
router.get(
  "/my-guides",
  authorizeRole(["Patient"]),
  getMyPrescribedGuides
);

// Get a specific guide by ID
router.get(
  "/guide/:id",
  authorizeRole(["Patient"]),
  getPrescribedGuideById
);

// Get all guides for a specific prescription
router.get(
  "/prescription/:prescriptionId/guides",
  authorizeRole(["Patient"]),
  getPrescriptionGuidesList
);




export default router;
