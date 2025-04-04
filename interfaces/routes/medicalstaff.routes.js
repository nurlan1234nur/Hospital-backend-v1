import express from "express";
import {
  createExamination,
  getExaminationById,
  updateExaminationById,
  deleteExaminationById,
  getPatientExaminationHistory,
  getMedicalStaffExamHistory,
  createQuestionnaire,
  getQuestionnaireById,
  updateQuestionnaireById,
  deleteQuestionnaireById,
  getPatientQuestionnaireList,
  getExaminationQuestionnaireList,
  getMyQuestionnaires,
  getDiseaseCodes,
  getDiseaseCodeDetails,
  getDiseaseCodeByIcd10
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
//doctor gets their exams
router.get(
  "/my-examinations",
  authorizeRole(["MedicalStaff"]),
  getMedicalStaffExamHistory
);



//QUESTION

router.post(
  "/question/",
  authorizeRole(["MedicalStaff"]),
  createQuestionnaire
);

router.get(
  "/question/:id",
  authorizeRole(["MedicalStaff", "Admin", "Patient"]),
  getQuestionnaireById
);

router.put(
  "/question/:id",
  authorizeRole(["MedicalStaff"]),
  updateQuestionnaireById
);

router.delete(
  "/question/:id",
  authorizeRole(["MedicalStaff"]),
  deleteQuestionnaireById
);

// Get all questionnaires for a specific patient (for medical staff)
router.get(
  "/patient/question/:patientId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getPatientQuestionnaireList
);

// Get all questionnaires for a specific examination
router.get(
  "/examination/question/:examinationId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getExaminationQuestionnaireList
);

// Get all questionnaires created by the logged-in medical staff
router.get(
  "/my-questions",
  authorizeRole(["MedicalStaff"]),
  getMyQuestionnaires
);



//DISEASES
router.get(
  "/icd10", 
  authorizeRole(["MedicalStaff"]),
  getDiseaseCodes);

router.get(
  "/icd10/:id", 
  authorizeRole(["MedicalStaff"]),
  getDiseaseCodeDetails);

router.get(
  "/icd10/code/:code",
  authorizeRole(["MedicalStaff"]),
  getDiseaseCodeByIcd10);

  



export default router;