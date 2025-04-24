import bcrypt from "bcrypt";
import { createError } from "../../utils/error.js";
import {
  listAllPatients, 
  findPatientById, 
  findPatientByUserId,
  createPatient,
  updatePatientById,
  deletePatientById,
  createAllergy,
  findAllergyById,
  updateAllergyById,
  deleteAllergyById,
  listPatientAllergies,
} from "../../infrastructure/repositories/patientRepository.js";

//buh uwchtun
export const createPatientUseCases = () => {
  // Get all patients with optional filters
  const listPatients = async (filters = {}) => {
    const patients = await listAllPatients(filters);
    return patients;
  };

  // Get a single patient by ID
  const getPatient = async (id) => {
    const patient = await findPatientById(id);
    if (!patient) {
      throw createError("Үйлчлүүлэгч олдсонгүй!", 404);
    }
    return patient;
  };

  // Get a patient by user ID
  const getPatientByUserId = async (userId) => {
    const patient = await findPatientByUserId(userId);
    if (!patient) {
      throw createError("Үйлчлүүлэгч олдсонгүй!", 404);
    }
    return patient;
  };

  // Create a new patient
  const addPatient = async (patientData) => {
    const patient = await createPatient(patientData);
    return patient;
  };

  // Update an existing patient
  const updatePatient = async (id, updateData) => {
    const patient = await findPatientById(id);
    if (!patient) {
      throw createError("Үйлчлүүлэгч олдсонгүй!", 404);
    }

    const updatedPatient = await updatePatientById(id, updateData);
    return updatedPatient;
  };

  // Delete a patient
  const removePatient = async (id) => {
    const patient = await findPatientById(id);
    if (!patient) {
      throw createError("Үйлчлүүлэгч олдсонгүй!", 404);
    }

    await deletePatientById(id);
    return { success: true, message: "Үйлчлүүлэгч амжилттай устгагдлаа!" };
  };

  return {
    listPatients,
    getPatient,
    getPatientByUserId,
    addPatient,
    updatePatient,
    removePatient
  };
};

//ALLERGY
export const createAllergyUseCases = () => {
  const addAllergy = async (allergyData) => {
    // Generate unique allergies_id
    const allergiesId = Date.now();

    const allergy = await createAllergy({
      ...allergyData,
      allergies_id: allergiesId,
    });

    return allergy;
  };

  const getAllergy = async (id) => {
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }
    return allergy;
  };

  const updateAllergy = async (id, updateData) => {
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }

    const updatedAllergy = await updateAllergyById(id, updateData);
    return updatedAllergy;
  };

  const removeAllergy = async (id) => {
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }

    await deleteAllergyById(id);
    return { success: true, message: "Харшлын мэдээлэл амжилттай устгагдлаа!" };
  };

  const getPatientAllergies = async (patientId) => {
    const allergies = await listPatientAllergies(patientId);
    return allergies;
  };

  return {
    addAllergy,
    getAllergy,
    updateAllergy,
    removeAllergy,
    getPatientAllergies,
  };
};
