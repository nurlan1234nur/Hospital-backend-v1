import MedicalHistory from "../../domain/models/MedicalHistory.model.js"; 
import { createError } from "../../utils/error.js";

// Өвчтөний ID-ийг ашиглан өвчтөн олох
export const findPatientById = async (patientId) => {
  const patient = await MedicalHistory.findOne({ patient: patientId });
  if (!patient) {
    throw createError("Өвчтөн олдсонгүй!", 404);
  }
  return patient;
};

// Эмнэлгийн түүх үүсгэх
export const createMedicalHistory = async ({
  patient,
  historyDate,
  diagnosis,
  treatment,
  prescription,
  medicalStaff,
}) => {
  const newMedicalHistory = new MedicalHistory({
    patient,
    historyDate,
    diagnosis,
    treatment,
    prescription,
    medicalStaff,
  });

  await newMedicalHistory.save();
  return newMedicalHistory;
};
