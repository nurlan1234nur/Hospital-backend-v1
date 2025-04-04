import bcrypt from "bcrypt";
import { listAllPatients } from "../../infrastructure/repositories/patientRepository.js";
import { createError } from "../../utils/error.js";
import { listPatientQuestionnaires } from "../../infrastructure/repositories/medicalStaffRepository.js";
import {
  createAllergy,
  findAllergyById,
  updateAllergyById,
  deleteAllergyById,
  listPatientAllergies
} from "../../infrastructure/repositories/patientRepository.js";
import {
  createChronicDisease,
  findChronicDiseaseById,
  updateChronicDiseaseById,
  deleteChronicDiseaseById,
  listPatientChronicDiseases
} from "../../infrastructure/repositories/patientRepository.js";
//buh uwchtun
export const createPatientUseCases = () => {
  const listPatients = async (filters = {}) => {
    const patients = await listAllPatients(filters);
    return patients;
  };

  return {
    listPatients,
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
    getPatientAllergies
  };
};

//chronic disease

export const createChronicDiseaseUseCases = () => {
  const addChronicDisease = async (diseaseData) => {
    const disease = await createChronicDisease(diseaseData);
    return disease;
  };

  const getChronicDisease = async (id) => {
    const disease = await findChronicDiseaseById(id);
    if (!disease) {
      throw createError("Архаг өвчний мэдээлэл олдсонгүй!", 404);
    }
    return disease;
  };

  const updateChronicDisease = async (id, updateData) => {
    const disease = await findChronicDiseaseById(id);
    if (!disease) {
      throw createError("Архаг өвчний мэдээлэл олдсонгүй!", 404);
    }
    
    const updatedDisease = await updateChronicDiseaseById(id, updateData);
    return updatedDisease;
  };

  const removeChronicDisease = async (id) => {
    const disease = await findChronicDiseaseById(id);
    if (!disease) {
      throw createError("Архаг өвчний мэдээлэл олдсонгүй!", 404);
    }
    
    await deleteChronicDiseaseById(id);
    return { success: true, message: "Архаг өвчний мэдээлэл амжилттай устгагдлаа!" };
  };

  const getPatientChronicDiseases = async (patientId) => {
    const diseases = await listPatientChronicDiseases(patientId);
    return diseases;
  };

  return {
    addChronicDisease,
    getChronicDisease,
    updateChronicDisease,
    removeChronicDisease,
    getPatientChronicDiseases
  };
};
