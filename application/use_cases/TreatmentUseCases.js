import {
    createTreatment,
    findTreatmentById,
    updateTreatmentById,
    deleteTreatmentById,
    listAllTreatments,
    listPatientTreatments,
    listMedicalStaffTreatments,
    listTreatmentsByExamination,
    listTreatmentsByType,
    listTreatmentsByDateRange
  } from "../../infrastructure/repositories/treatmentRepository.js";
  import { createError } from "../../utils/error.js";
  
  // TREATMENT
  export const createTreatmentUseCases = () => {
    const addTreatment = async (treatmentData) => {
      const treatment = await createTreatment({
        ...treatmentData,
        date: treatmentData.date || new Date(),
        sessionsCompleted: treatmentData.sessionsCompleted || 0
      });
  
      return treatment;
    };
  
    const getTreatment = async (id) => {
      const treatment = await findTreatmentById(id);
      if (!treatment) {
        throw createError("Эмчилгээний мэдээлэл олдсонгүй!", 404);
      }
      return treatment;
    };
  
    const updateTreatment = async (id, updateData) => {
      const treatment = await findTreatmentById(id);
      if (!treatment) {
        throw createError("Эмчилгээний мэдээлэл олдсонгүй!", 404);
      }
  
      // Check if staff can update this treatment
      if (
        updateData.staffId &&
        treatment.medicalStaff._id.toString() !== updateData.staffId
      ) {
        throw createError("Зөвхөн өөрийн бичсэн эмчилгээний мэдээллийг засах боломжтой!", 403);
      }
  
      // Remove staffId from update data as it's not a field in the model
      if (updateData.staffId) {
        delete updateData.staffId;
      }
  
      const updatedTreatment = await updateTreatmentById(id, updateData);
      return updatedTreatment;
    };
  
    const removeTreatment = async (id, staffId) => {
      const treatment = await findTreatmentById(id);
      if (!treatment) {
        throw createError("Эмчилгээний мэдээлэл олдсонгүй!", 404);
      }
  
      // Ensure staff can only delete their own treatments
      if (treatment.medicalStaff._id.toString() !== staffId) {
        throw createError("Зөвхөн өөрийн бичсэн эмчилгээний мэдээллийг устгах боломжтой!", 403);
      }
  
      await deleteTreatmentById(id);
      return { success: true, message: "Эмчилгээний мэдээлэл амжилттай устгагдлаа!" };
    };
  
    const getAllTreatments = async () => {
      const treatments = await listAllTreatments();
      return treatments;
    };
  
    const getPatientTreatments = async (patientId) => {
      const treatments = await listPatientTreatments(patientId);
      return treatments;
    };
  
    const getMedicalStaffTreatments = async (staffId) => {
      const treatments = await listMedicalStaffTreatments(staffId);
      return treatments;
    };
  
    const getTreatmentsByExamination = async (examinationId) => {
      const treatments = await listTreatmentsByExamination(examinationId);
      return treatments;
    };
  
    const getTreatmentsByType = async (treatmentType) => {
      const treatments = await listTreatmentsByType(treatmentType);
      return treatments;
    };
  
    const getTreatmentsByDateRange = async (startDate, endDate) => {
      const treatments = await listTreatmentsByDateRange(startDate, endDate);
      return treatments;
    };
  
    return {
      addTreatment,
      getTreatment,
      updateTreatment,
      removeTreatment,
      getAllTreatments,
      getPatientTreatments,
      getMedicalStaffTreatments,
      getTreatmentsByExamination,
      getTreatmentsByType,
      getTreatmentsByDateRange
    };
  };