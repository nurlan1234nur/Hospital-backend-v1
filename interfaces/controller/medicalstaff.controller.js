import { createExaminationUseCases } from "../../application/use_cases/medicalStaffUsecases.js";
import { examinationSchema, examinationUpdateSchema } from "../../utils/validators.js"; 



//UZLEG
const {
  addExamination,
  getExamination,
  updateExamination,
  removeExamination,
  getPatientExaminations
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
    
    // Add the medical staff ID to verify ownership
    const updateData = {
      ...req.body,
      staffId: req.user.id // This will be checked in the use case and removed before update
    };
    
    // Validate update data
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

  

