import { createError } from "../../utils/error.js";
import {
  findPatientById,
  findMedicalStaffById,
} from "../../infrastructure/repositories/authRepository.js";
import {
  createTreatment,
  updateTreatmentById,
} from "../../infrastructure/repositories/treatmentRepository.js";
import Treatment from "../../domain/models/Treatment.model.js";

export const createTreatmentUseCases = () => {
  const registerTreatment = async ({
    treatment_id,
    date,
    treatmentType,
    diagnosisType,
    howManyTimes,
    howManyDone,
    patientId,
    medicalStaffId,
  }) => {
    const patient = await findPatientById(patientId);
    if (!patient) throw createError("Өвчтөн олдсонгүй!", 404);

    const medicalStaff = await findMedicalStaffById(medicalStaffId);
    if (!medicalStaff) throw createError("Эрүүл мэндийн ажилтан олдсонгүй!", 404);

    const treatment = await createTreatment({
      treatment_id,
      date,
      treatmentType,
      diagnosisType,
      howManyTimes,
      howManyDone,
      patient: patient._id,
      medicalStaff: medicalStaff._id,
    });

    return treatment;
  };

  const updateTreatmentDetails = async ({ treatment_id, howManyDone }) => {
    const treatment = await updateTreatmentById(treatment_id, { howManyDone });
    if (!treatment) throw createError("Эмчилгээ олдсонгүй!", 404);
    return treatment;
  };

  return {
    registerTreatment,
    updateTreatmentDetails,
  };
};

export const getTreatmentHistoryUseCase = async (patientId) => {
  const treatments = await Treatment.find({ patient: patientId })
    .populate("medicalStaff", "firstName lastName")
    .sort({ date: -1 });
  return treatments;
};
