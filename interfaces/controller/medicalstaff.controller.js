import { createExaminationUseCases,createQuestionnaireUseCases,createDiseaseCodeUseCases } from "../../application/use_cases/medicalStaffUsecases.js";
import { examinationSchema, 
  examinationUpdateSchema, 
  questionnaireSchema, 
  questionnaireUpdateSchema,
  patientQuestionnaireResponseSchema } from "../../utils/validators.js";

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

  

