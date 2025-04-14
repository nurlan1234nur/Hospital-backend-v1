import Treatment from "../../domain/models/Treatment.model.js";
import { createError } from "../../utils/error.js";
import Patient from "../../domain/models/Patient.model.js";
import MedicalStaff from "../../domain/models/MedicalStaff.model.js";

// Эмчилгээ бүртгэх
export const createTreatment = async (treatmentData) => {
  return await Treatment.create(treatmentData);
};

// treatment_id-аар нэг эмчилгээ хайх
export const findTreatmentById = async (treatment_id) => {
  return await Treatment.findOne({ treatment_id: Number(treatment_id) })
    .populate('patient')
    .populate('medicalStaff'); // populate нэмсэн
};

// Эмчилгээг шинэчлэх
export const updateTreatmentById = async (treatment_id, updateData) => {
  return await Treatment.findOneAndUpdate(
    { treatment_id: Number(treatment_id) },
    updateData,
    { new: true }
  )
  .populate('patient')
  .populate('medicalStaff'); // шинэчилсний дараа populate хийсэн
};
