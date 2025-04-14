import { findPatientById, createMedicalHistory } from "../../infrastructure/repositories/medicalHistoryRepository.js";
import { createError } from "../../utils/error.js";

export const createMedicalHistoryUseCases = () => {
  // Эмнэлгийн түүх бүртгэх
  const registerMedicalHistory = async ({
    patientId,
    historyDate,
    diagnosis,
    treatment,
    prescription,
    medicalStaff,
  }) => {
    const patient = await findPatientById(patientId);
    if (!patient) {
      throw createError("Өвчтөн олдсонгүй!", 404);
    }

    const medicalHistory = await createMedicalHistory({
      patient: patient._id,
      historyDate,
      diagnosis,
      treatment,
      prescription,
      medicalStaff,
    });

    return medicalHistory;
  };

  return {
    registerMedicalHistory,
  };
};
