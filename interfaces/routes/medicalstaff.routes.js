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
  getDiseaseCodeByIcd10,
  createVitalSigns,
  getVitalSignsById,
  updateVitalSignsById,
  deleteVitalSignsById,
  getPatientVitalSignsList,
  getPatientLatestVitalSigns,
  getPatientVitalSignsByDateRange,
  getMyVitalSignsByStaff,
  createDiagnosis,
  getDiagnosisById,
  updateDiagnosisById,
  deleteDiagnosisById,
  getPatientDiagnosisList,
  getExaminationDiagnosisList,
  getMyDiagnoses
} from "../controller/medicalstaff.controller.js";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";
import { createAllergy, createChronicDisease, deleteAllergyById, deleteChronicDiseaseById, getAllergyById, getChronicDiseaseById, getPatientAllergyList, getPatientChronicDiseaseList, updateAllergyById, updateChronicDiseaseById } from "../controller/patient.controller.js";

const router = express.Router();

//middleware
router.use(authenticateJWT);

//routes


//EXAMINATIONS
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





//VITAL SIGNS
router.post(
  "/vitalsigns",
  authorizeRole(["MedicalStaff"]),
  createVitalSigns
);

router.get(
  "/vitalsigns/:id",
  authorizeRole(["MedicalStaff"]),
  getVitalSignsById
);

router.put(
  "/vitalsigns/:id",
  authorizeRole(["MedicalStaff"]),
  updateVitalSignsById
);

router.delete(
  "/vitalsigns/:id",
  authorizeRole(["MedicalStaff"]),
  deleteVitalSignsById
);

router.get(
  "/patient/:patientId/vitalsigns",
  authorizeRole(["MedicalStaff"]),
  getPatientVitalSignsList
);

router.get(
  "/patient/:patientId/vitalsigns/latest",
  authorizeRole(["MedicalStaff"]),
  getPatientLatestVitalSigns
);

router.get(
  "/patient/:patientId/vitalsigns/daterange",
  authorizeRole(["MedicalStaff"]),
  getPatientVitalSignsByDateRange
);

router.get(
  "/vitalsigns/my/recorded",
  authorizeRole(["MedicalStaff"]),
  getMyVitalSignsByStaff
);





//DIAGNOSIS
router.post(
  "/diagnosis",
  authorizeRole(["MedicalStaff"]),
  createDiagnosis
);

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

// Get all diagnoses for a specific examination (for medical staff and the patient)
router.get(
  "/examination/diagnosis/:examinationId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getExaminationDiagnosisList
);

// Get all my diagnoses (for patients to see their own diagnoses or staff to see diagnoses they created)
router.get(
  "/my-diagnoses",
  authorizeRole(["MedicalStaff"]),
  getMyDiagnoses
);
export default router;