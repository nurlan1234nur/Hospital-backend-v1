import { createPatientUseCases } from "../../application/use_cases/patientUseCases.js";
import { modifiedPatient } from "../../utils/formatter.js";
import { createExaminationUseCases } from "../../application/use_cases/medicalStaffUsecases.js";

import { createAllergyUseCases } from "../../application/use_cases/patientUseCases.js";
import { allergySchema, allergyUpdateSchema } from "../../utils/validators.js";
import { findAllergyById } from "../../infrastructure/repositories/patientRepository.js";
import { createError } from "../../utils/error.js";

import { createChronicDiseaseUseCases } from "../../application/use_cases/patientUseCases.js";
import { chronicDiseaseSchema, chronicDiseaseUpdateSchema } from "../../utils/validators.js";
import { findChronicDiseaseById } from "../../infrastructure/repositories/patientRepository.js";


const {
  addAllergy,
  getAllergy,
  updateAllergy,
  removeAllergy,
  getPatientAllergies
} = createAllergyUseCases();

const {
  addChronicDisease,
  getChronicDisease,
  updateChronicDisease,
  removeChronicDisease,
  getPatientChronicDiseases
} = createChronicDiseaseUseCases();


const { listPatients } = createPatientUseCases();

const { getPatientExaminations } = createExaminationUseCases();
//buh uwchtung jagsaah

export const listAllPatients = async (req, res) => {
  try {
    const patients = await listPatients();
    const safePatients = patients.map(modifiedPatient);
    res.status(200).json({
      message: "Read successfully!",
      count: safePatients.length,
      patients: safePatients,
    });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    res.status(status).json({ error: message });
  }
};
//uuriin uzlegiin medeellig harah
export const getOwnExaminations = async (req, res) => {
  try {
    const patientId = req.user.id; // токеноос гарч ирсэн өөрийн ID

    const examinations = await getPatientExaminations(patientId);

    return res.status(200).json({
      success: true,
      count: examinations.length,
      data: examinations,
    });
  } catch (error) {
    console.error("Error fetching own examinations:", error);
    return res.status(500).json({ error: "Үзлэгийн түүх авахад алдаа гарлаа!" });
  }
};


//allergy
export const createAllergy = async (req, res) => {
  try {
    // Validate input
    const validatedData = allergySchema.parse(req.body);
    
    const allergy = await addAllergy(validatedData);
    
    return res.status(201).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай бүртгэгдлээ!",
      data: allergy
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getAllergyById = async (req, res) => {
  try {
    const { id } = req.params;
    const allergy = await getAllergy(id);
    
    return res.status(200).json({
      success: true,
      data: allergy
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateAllergyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate update data
    const validatedData = allergyUpdateSchema.parse(req.body);
    
    const updatedAllergy = await updateAllergy(id, validatedData);
    
    return res.status(200).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedAllergy
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteAllergyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await removeAllergy(id);
    
    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientAllergyList = async (req, res) => {
  try {
    const { patientId } = req.params;
    const allergies = await getPatientAllergies(patientId);
    
    return res.status(200).json({
      success: true,
      count: allergies.length,
      data: allergies
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

// Patient-specific controllers for managing their own allergies

export const getMyAllergies = async (req, res) => {
  try {
    const patientId = req.user.id; // Get patient ID from the authenticated user
    const allergies = await getPatientAllergies(patientId);
    
    return res.status(200).json({
      success: true,
      count: allergies.length,
      data: allergies
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const createMyAllergy = async (req, res) => {
  try {
    const patientId = req.user.id; // Get patient ID from the authenticated user
    
    // Add patient ID to the request body
    const allergyData = {
      ...req.body,
      patient: patientId
    };
    
    // Validate input
    const validatedData = allergySchema.parse(allergyData);
    
    const allergy = await addAllergy(validatedData);
    
    return res.status(201).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай бүртгэгдлээ!",
      data: allergy
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateMyAllergyById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user.id; // Get patient ID from the authenticated user
    
    // Check if the allergy belongs to the patient
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }
    
    // Verify ownership
    if (allergy.patient.toString() !== patientId) {
      throw createError("Энэ харшлын мэдээлэлд хандах эрхгүй байна!", 403);
    }
    
    // Validate update data
    const validatedData = allergyUpdateSchema.parse(req.body);
    
    const updatedAllergy = await updateAllergy(id, validatedData);
    
    return res.status(200).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedAllergy
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteMyAllergyById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user.id; // Get patient ID from the authenticated user
    
    // Check if the allergy belongs to the patient
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }
    
    // Verify ownership
    if (allergy.patient.toString() !== patientId) {
      throw createError("Энэ харшлын мэдээлэлд хандах эрхгүй байна!", 403);
    }
    
    await removeAllergy(id);
    
    return res.status(200).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай устгагдлаа!"
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

//CHRONIC DISEASE
export const createChronicDisease = async (req, res) => {
  try {
    // Validate input
    const validatedData = chronicDiseaseSchema.parse(req.body);
    
    const disease = await addChronicDisease(validatedData);
    
    return res.status(201).json({
      success: true,
      message: "Архаг өвчний мэдээлэл амжилттай бүртгэгдлээ!",
      data: disease
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getChronicDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const disease = await getChronicDisease(id);
    
    return res.status(200).json({
      success: true,
      data: disease
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateChronicDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate update data
    const validatedData = chronicDiseaseUpdateSchema.parse(req.body);
    
    const updatedDisease = await updateChronicDisease(id, validatedData);
    
    return res.status(200).json({
      success: true,
      message: "Архаг өвчний мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedDisease
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteChronicDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await removeChronicDisease(id);
    
    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientChronicDiseaseList = async (req, res) => {
  try {
    const { patientId } = req.params;
    const diseases = await getPatientChronicDiseases(patientId);
    
    return res.status(200).json({
      success: true,
      count: diseases.length,
      data: diseases
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

// Patient-specific controllers for managing their own chronic diseases

export const getMyChronicDiseases = async (req, res) => {
  try {
    const patientId = req.user.id; // Get patient ID from the authenticated user
    const diseases = await getPatientChronicDiseases(patientId);
    
    return res.status(200).json({
      success: true,
      count: diseases.length,
      data: diseases
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const createMyChronicDisease = async (req, res) => {
  try {
    const patientId = req.user.id; // Get patient ID from the authenticated user
    
    // Add patient ID to the request body
    const diseaseData = {
      ...req.body,
      patient: patientId
    };
    
    // Validate input
    const validatedData = chronicDiseaseSchema.parse(diseaseData);
    
    const disease = await addChronicDisease(validatedData);
    
    return res.status(201).json({
      success: true,
      message: "Архаг өвчний мэдээлэл амжилттай бүртгэгдлээ!",
      data: disease
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateMyChronicDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user.id; // Get patient ID from the authenticated user
    
    // Check if the disease belongs to the patient
    const disease = await findChronicDiseaseById(id);
    if (!disease) {
      throw createError("Архаг өвчний мэдээлэл олдсонгүй!", 404);
    }
    
    // Verify ownership
    if (disease.patient.toString() !== patientId) {
      throw createError("Энэ архаг өвчний мэдээлэлд хандах эрхгүй байна!", 403);
    }
    
    // Validate update data
    const validatedData = chronicDiseaseUpdateSchema.parse(req.body);
    
    const updatedDisease = await updateChronicDisease(id, validatedData);
    
    return res.status(200).json({
      success: true,
      message: "Архаг өвчний мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedDisease
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteMyChronicDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user.id; // Get patient ID from the authenticated user
    
    // Check if the disease belongs to the patient
    const disease = await findChronicDiseaseById(id);
    if (!disease) {
      throw createError("Архаг өвчний мэдээлэл олдсонгүй!", 404);
    }
    
    // Verify ownership
    if (disease.patient.toString() !== patientId) {
      throw createError("Энэ архаг өвчний мэдээлэлд хандах эрхгүй байна!", 403);
    }
    
    await removeChronicDisease(id);
    
    return res.status(200).json({
      success: true,
      message: "Архаг өвчний мэдээлэл амжилттай устгагдлаа!"
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

// Common Error Handler
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