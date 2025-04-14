import { createMedicalHistoryUseCases } from "../../application/use_cases/medicalHistoryCases.js";
import { createMedicalHistory } from "../../infrastructure/repositories/medicalHistoryRepository.js";
import { createError } from "../../utils/error.js";

const { registerMedicalHistory } = createMedicalHistoryUseCases();

// Эмнэлгийн түүх бүртгэх
export const registerMedicalHistoryController = async (req, res, next) => {
  const {
    patientId,
    historyDate,
    diagnosis,
    treatment,
    prescription,
    medicalStaff,
  } = req.body;

  try {
    const medicalHistory = await registerMedicalHistory({
      patientId,
      historyDate,
      diagnosis,
      treatment,
      prescription,
      medicalStaff,
    });
    res.status(201).json(medicalHistory);
  } catch (error) {
    next(error);
  }
};
