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
import { getMyLatestVitalSigns, getMyVitalSigns, getPatientVitalSignsByDateRange, getVitalSignsById } from "../controller/medicalstaff.controller.js";
 


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







export default router;
