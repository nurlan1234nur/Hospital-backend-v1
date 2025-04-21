import express from "express";
import {
    getDiseaseCodes,
    getDiseaseCodeDetails,
    getDiseaseCodeByIcd10,
  } from "../controller/diseases.controller.js";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

//middleware
router.use(authenticateJWT);

//=====================DISEASES=========================
router.get("/icd10", 
authorizeRole(["MedicalStaff"]), 
getDiseaseCodes);

router.get(
  "/icd10/:id",
  authorizeRole(["MedicalStaff"]),
  getDiseaseCodeDetails
);

router.get(
  "/icd10/code/:code",
  authorizeRole(["MedicalStaff"]),
  getDiseaseCodeByIcd10
);
export default router;
