import { createExaminationUseCases,
  createQuestionnaireUseCases,
  createDiseaseCodeUseCases,
  createVitalSignsUseCases,
  createDiagnosisUseCases } from "../../application/use_cases/medicalStaffUsecases.js";
import { examinationSchema, 
  examinationUpdateSchema, 
  questionnaireSchema, 
  questionnaireUpdateSchema,
  patientQuestionnaireResponseSchema,
  vitalSignsSchema, vitalSignsUpdateSchema, dateRangeSchema,
  diagnosisSchema, diagnosisUpdateSchema } from "../../utils/validators.js";

import { findQuestionnaireById } from "../../infrastructure/repositories/medicalStaffRepository.js";





//UZLEG
const {
  addExamination,
  getExamination,
  updateExamination,
  removeExamination,
  getPatientExaminations,
  getMedicalStaffExaminations
} = createExaminationUseCases();

export const createExamination = async (req, res) => {
  try {
    // Add the medical staff ID from authenticated user
    const examinationData = {
      ...req.body,
      medicalStaff: req.user.id
    };
    
   
    const validatedData = examinationSchema.parse(examinationData);
    
    const examination = await addExamination(validatedData);
    
    return res.status(201).json({
      success: true,
      message: "Үзлэгийн мэдээлэл амжилттай бүртгэгдлээ!",
      data: examination
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getExaminationById = async (req, res) => {
  try {
    const { id } = req.params;
    const examination = await getExamination(id);
    
    return res.status(200).json({
      success: true,
      data: examination
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateExaminationById = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
      staffId: req.user.id
    };

    const validatedData = examinationUpdateSchema.parse(updateData);
    
    const updatedExamination = await updateExamination(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Үзлэгийн мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedExamination
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteExaminationById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.id;
    
    const result = await removeExamination(id, staffId);
    
    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientExaminationHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const examinations = await getPatientExaminations(patientId);
    
    return res.status(200).json({
      success: true,
      count: examinations.length,
      data: examinations
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};
//all the examinations that medical staff
export const getMedicalStaffExamHistory = async (req, res) => {
  try {
    const staffId = req.user.id;
    const filters = req.query; // You can pass query parameters for filtering

    const examinations = await getMedicalStaffExaminations(staffId, filters);
    
    return res.status(200).json({
      success: true,
      count: examinations.length,
      data: examinations
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};





//QUESTION

const {
  addQuestionnaire,
  getQuestionnaire,
  updateQuestionnaire,
  removeQuestionnaire,
  getPatientQuestionnaires,
  getExaminationQuestionnaires,
  getMedicalStaffQuestionnaires
} = createQuestionnaireUseCases();

// For medical staff to create questionnaires
export const createQuestionnaire = async (req, res) => {
  try {
    // Add the medical staff ID from authenticated user
    const questionnaireData = {
      ...req.body,
      medicalStaff: req.user.id
    };
    
    // Validate input
    const validatedData = questionnaireSchema.parse(questionnaireData);
    
    const questionnaire = await addQuestionnaire(validatedData);
    
    return res.status(201).json({
      success: true,
      message: "Асуумжийн мэдээлэл амжилттай бүртгэгдлээ!",
      data: questionnaire
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getQuestionnaireById = async (req, res) => {
  try {
    const { id } = req.params;
    const questionnaire = await getQuestionnaire(id);
    
    return res.status(200).json({
      success: true,
      data: questionnaire
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateQuestionnaireById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Add staff ID for verification that they own this questionnaire
    const updateData = {
      ...req.body,
      staffId: req.user.id
    };
    
    // Validate update data
    const validatedData = questionnaireUpdateSchema.parse(updateData);
    
    const updatedQuestionnaire = await updateQuestionnaire(id, validatedData);
    
    return res.status(200).json({
      success: true,
      message: "Асуумжийн мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedQuestionnaire
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteQuestionnaireById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.id;
    
    const result = await removeQuestionnaire(id, staffId);
    
    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientQuestionnaireList = async (req, res) => {
  try {
    const { patientId } = req.params;
    const questionnaires = await getPatientQuestionnaires(patientId);
    
    return res.status(200).json({
      success: true,
      count: questionnaires.length,
      data: questionnaires
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getExaminationQuestionnaireList = async (req, res) => {
  try {
    const { examinationId } = req.params;
    const questionnaires = await getExaminationQuestionnaires(examinationId);
    
    return res.status(200).json({
      success: true,
      count: questionnaires.length,
      data: questionnaires
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyQuestionnaires = async (req, res) => {
  try {
    const staffId = req.user.id;
    const questionnaires = await getMedicalStaffQuestionnaires(staffId);
    
    return res.status(200).json({
      success: true,
      count: questionnaires.length,
      data: questionnaires
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};




const handleZodOrAppError = (res, error, fallbackStatus = 400) => {
  if (error.name === "ZodError") {
    const errors = error.errors.map((e) => ({
      field: e.path[0],
      message: e.message,
    }));
    return res.status(400).json({ errors });
  }
  const status = error.statusCode || fallbackStatus;
  const message = error.message || "Something went wrong";
  return res.status(status).json({ error: message });
};





//DISEASES
const {
  listDiseaseCodes,
  getDiseaseCodeById,
  getDiseaseCodeByValue
} = createDiseaseCodeUseCases();

export const getDiseaseCodes = async (req, res) => {
  try {
    const filters = {
      search: req.query.search,
      limit: req.query.limit
    };
    
    const diseaseCodes = await listDiseaseCodes(filters);
    
    return res.status(200).json({
      success: true,
      count: diseaseCodes.length,
      data: diseaseCodes
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getDiseaseCodeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const diseaseCode = await getDiseaseCodeById(id);
    
    return res.status(200).json({
      success: true,
      data: diseaseCode
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getDiseaseCodeByIcd10 = async (req, res) => {
  try {
    const { code } = req.params;
    const diseaseCode = await getDiseaseCodeByValue(code);
    
    return res.status(200).json({
      success: true,
      data: diseaseCode
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const importIcd10Codes = async (req, res) => {
  try {
    const codes = req.body;
    
    if (!Array.isArray(codes)) {
      return res.status(400).json({
        success: false,
        error: "Зөв форматтай өгөгдөл оруулна уу. JSON массив шаардлагатай."
      });
    }
    
    const result = await importDiseaseCodes(codes);
    
    return res.status(201).json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

// Common Error Handler
const handleError = (res, error) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).json({ 
    success: false,
    error: message 
  });
};




//VITAL SIGNS
const {
  addVitalSigns,
  getVitalSigns,
  updateVitalSigns,
  removeVitalSigns,
  getPatientVitalSignsHistory,
  getLatestVitalSigns,
  getVitalSignsByDateRange,
  getMedicalStaffVitalSigns
} = createVitalSignsUseCases();

export const createVitalSigns = async (req, res) => {
  try {
    // Add the medical staff ID from authenticated user
    const vitalSignsData = {
      ...req.body,
      medicalStaff: req.user.id
    };
    
    // Parse date if it's a string
    if (vitalSignsData.date && typeof vitalSignsData.date === 'string') {
      vitalSignsData.date = new Date(vitalSignsData.date);
    }
    
    // Validate input
    const validatedData = vitalSignsSchema.parse(vitalSignsData);
    
    const vitalSigns = await addVitalSigns(validatedData);
    
    return res.status(201).json({
      success: true,
      message: "Амин үзүүлэлтийн мэдээлэл амжилттай бүртгэгдлээ!",
      data: vitalSigns
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getVitalSignsById = async (req, res) => {
  try {
    const { id } = req.params;
    const vitalSigns = await getVitalSigns(id);
    
    return res.status(200).json({
      success: true,
      data: vitalSigns
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateVitalSignsById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Add staff ID for verification that they recorded these vital signs
    const updateData = {
      ...req.body,
      staffId: req.user.id
    };
    
    // Parse date if it's a string
    if (updateData.date && typeof updateData.date === 'string') {
      updateData.date = new Date(updateData.date);
    }
    
    // Validate update data
    const validatedData = vitalSignsUpdateSchema.parse(updateData);
    
    const updatedVitalSigns = await updateVitalSigns(id, validatedData);
    
    return res.status(200).json({
      success: true,
      message: "Амин үзүүлэлтийн мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedVitalSigns
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteVitalSignsById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.id;
    
    const result = await removeVitalSigns(id, staffId);
    
    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientVitalSignsList = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { limit } = req.query;
    
    const vitalSigns = await getPatientVitalSignsHistory(patientId, parseInt(limit) || 0);
    
    return res.status(200).json({
      success: true,
      count: vitalSigns.length,
      data: vitalSigns
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientLatestVitalSigns = async (req, res) => {
  try {
    const { patientId } = req.params;
    const vitalSigns = await getLatestVitalSigns(patientId);
    
    return res.status(200).json({
      success: true,
      data: vitalSigns
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientVitalSignsByDateRange = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { startDate, endDate } = req.query;
    
    // Validate date range
    const validatedDates = dateRangeSchema.parse({ startDate, endDate });
    
    const vitalSigns = await getVitalSignsByDateRange(
      patientId, 
      validatedDates.startDate, 
      validatedDates.endDate
    );
    
    return res.status(200).json({
      success: true,
      count: vitalSigns.length,
      data: vitalSigns
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyVitalSigns = async (req, res) => {
  try {
    const patientId = req.user.id;
    const vitalSigns = await getPatientVitalSignsHistory(patientId);
    
    return res.status(200).json({
      success: true,
      count: vitalSigns.length,
      data: vitalSigns
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyLatestVitalSigns = async (req, res) => {
  try {
    const patientId = req.user.id;
    const vitalSigns = await getLatestVitalSigns(patientId);
    
    return res.status(200).json({
      success: true,
      data: vitalSigns
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyVitalSignsByStaff = async (req, res) => {
  try {
    const staffId = req.user.id;
    const { limit } = req.query;
    
    const vitalSigns = await getMedicalStaffVitalSigns(staffId, parseInt(limit) || 0);
    
    return res.status(200).json({
      success: true,
      count: vitalSigns.length,
      data: vitalSigns
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};




//DIAGNOSIS
const {
  addDiagnosis,
  getDiagnosis,
  updateDiagnosis,
  removeDiagnosis,
  getPatientDiagnoses,
  getExaminationDiagnoses,
  getMedicalStaffDiagnoses
} = createDiagnosisUseCases();

export const createDiagnosis = async (req, res) => {
  try {
    // Add the medical staff ID from authenticated user
    const diagnosisData = {
      ...req.body,
      medicalStaff: req.user.id
    };
    
    // Validate input
    const validatedData = diagnosisSchema.parse(diagnosisData);
    
    const diagnosis = await addDiagnosis(validatedData);
    
    return res.status(201).json({
      success: true,
      message: "Оношийн мэдээлэл амжилттай бүртгэгдлээ!",
      data: diagnosis
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getDiagnosisById = async (req, res) => {
  try {
    const { id } = req.params;
    const diagnosis = await getDiagnosis(id);
    
    // Check if the user is authorized to view this diagnosis
    if (req.user.role === 'Patient' && diagnosis.patient._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Танд энэ оношийн мэдээллийг харах эрх байхгүй байна!"
      });
    }
    
    return res.status(200).json({
      success: true,
      data: diagnosis
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateDiagnosisById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Add staff ID for verification that they own this diagnosis
    const updateData = {
      ...req.body,
      staffId: req.user.id
    };
    
    // Validate update data
    const validatedData = diagnosisUpdateSchema.parse(updateData);
    
    const updatedDiagnosis = await updateDiagnosis(id, validatedData);
    
    return res.status(200).json({
      success: true,
      message: "Оношийн мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedDiagnosis
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteDiagnosisById = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.id;
    
    const result = await removeDiagnosis(id, staffId);
    
    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientDiagnosisList = async (req, res) => {
  try {
    const { patientId } = req.params;
    
    // Check authorization if a patient is trying to access diagnoses
    if (req.user.role === 'Patient' && patientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Танд бусад өвчтөний мэдээллийг харах эрх байхгүй байна!"
      });
    }
    
    const diagnoses = await getPatientDiagnoses(patientId);
    
    return res.status(200).json({
      success: true,
      count: diagnoses.length,
      data: diagnoses
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getExaminationDiagnosisList = async (req, res) => {
  try {
    const { examinationId } = req.params;
    const diagnoses = await getExaminationDiagnoses(examinationId);
    
    // If patient is requesting, verify they own the examination
    if (req.user.role === 'Patient') {
      // First check if any diagnoses exist
      if (diagnoses.length > 0) {
        // Check if this patient owns these diagnoses
        if (diagnoses[0].patient._id.toString() !== req.user.id) {
          return res.status(403).json({
            success: false,
            error: "Танд энэ үзлэгийн оношийг харах эрх байхгүй байна!"
          });
        }
      }
    }
    
    return res.status(200).json({
      success: true,
      count: diagnoses.length,
      data: diagnoses
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getMyDiagnoses = async (req, res) => {
  try {
    // Function works for both patients and medical staff
    const userId = req.user.id;
    
    if (req.user.role === 'Patient') {
      // If user is a patient, get their diagnoses
      const diagnoses = await getPatientDiagnoses(userId);
      return res.status(200).json({
        success: true,
        count: diagnoses.length,
        data: diagnoses
      });
    } else if (req.user.role === 'MedicalStaff') {
      // If user is medical staff, get diagnoses they created
      const diagnoses = await getMedicalStaffDiagnoses(userId);
      return res.status(200).json({
        success: true,
        count: diagnoses.length,
        data: diagnoses
      });
    } else {
      return res.status(403).json({
        success: false,
        error: "Энэ үйлдлийг гүйцэтгэх эрх байхгүй байна!"
      });
    }
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

  

