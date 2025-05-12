import {
  createMyChronicDisease,
  getMyChronicDiseases,
  updateMyChronicDiseaseById,
  deleteMyChronicDiseaseById,
  createChronicDisease,
  deleteChronicDiseaseById,
  getChronicDiseaseById,
  getPatientChronicDiseaseList,
  updateChronicDiseaseById,
} from "../controller/chronicDisease.controller.js";

import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

import express from "express";

const router = express.Router();
router.use(authenticateJWT);

//CHRONIC DISEASE

router.get("/my/diseases", 
authorizeRole(["Patient"]), 
getMyChronicDiseases);

router.post("/my/diseases", authorizeRole(["Patient"]), createMyChronicDisease);

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

//=================CHRONIC DISEASE=====================
router.post(
  "/",
  authorizeRole(["MedicalStaff", "Admin"]),
  createChronicDisease
);

router.get(
  "/:id",
  authorizeRole(["MedicalStaff", "Admin", "Patient"]),
  getChronicDiseaseById
);

router.put(
  "/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  updateChronicDiseaseById
);

router.delete(
  "/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  deleteChronicDiseaseById
);

// Get all chronic diseases for a specific patient (medical staff and admin)
router.get(
  "/patient/:patientId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientChronicDiseaseList
);

export default router;
