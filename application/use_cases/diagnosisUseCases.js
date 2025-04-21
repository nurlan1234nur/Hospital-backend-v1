import {
    createDiagnosis,
    findDiagnosisById,
    updateDiagnosisById,
    deleteDiagnosisById,
    listPatientDiagnoses,
    listExaminationDiagnoses,
    listMedicalStaffDiagnoses,
  } from "../../infrastructure/repositories/diagnosisRepository.js";
import { createError } from "../../utils/error.js";
//DIAGNOSIS
export const createDiagnosisUseCases = () => {
    const addDiagnosis = async (diagnosisData) => {
      const diagnosis = await createDiagnosis(diagnosisData);
      return diagnosis;
    };
  
    const getDiagnosis = async (id) => {
      const diagnosis = await findDiagnosisById(id);
      if (!diagnosis) {
        throw createError("Оношийн мэдээлэл олдсонгүй!", 404);
      }
      return diagnosis;
    };
  
    const updateDiagnosis = async (id, updateData) => {
      const diagnosis = await findDiagnosisById(id);
      if (!diagnosis) {
        throw createError("Оношийн мэдээлэл олдсонгүй!", 404);
      }
  
      // Check if staff can update this diagnosis
      if (
        updateData.staffId &&
        diagnosis.medicalStaff._id.toString() !== updateData.staffId
      ) {
        throw createError(
          "Зөвхөн өөрийн бүртгэсэн оношийг засах боломжтой!",
          403
        );
      }
  
      // Remove staffId from update data as it's not a field in the model
      if (updateData.staffId) {
        delete updateData.staffId;
      }
  
      const updatedDiagnosis = await updateDiagnosisById(id, updateData);
      return updatedDiagnosis;
    };
  
    const removeDiagnosis = async (id, staffId) => {
      const diagnosis = await findDiagnosisById(id);
      if (!diagnosis) {
        throw createError("Оношийн мэдээлэл олдсонгүй!", 404);
      }
  
      // Ensure staff can only delete their own diagnoses
      if (diagnosis.medicalStaff._id.toString() !== staffId) {
        throw createError(
          "Зөвхөн өөрийн бүртгэсэн оношийг устгах боломжтой!",
          403
        );
      }
  
      await deleteDiagnosisById(id);
      return { success: true, message: "Оношийн мэдээлэл амжилттай устгагдлаа!" };
    };
  
    const getPatientDiagnoses = async (patientId, filters = {}) => {
      const diagnoses = await listPatientDiagnoses(patientId, filters);
      return diagnoses;
    };
  
    const getExaminationDiagnoses = async (examinationId) => {
      const diagnoses = await listExaminationDiagnoses(examinationId);
      return diagnoses;
    };
  
    const getMedicalStaffDiagnoses = async (staffId, filters = {}) => {
      const diagnoses = await listMedicalStaffDiagnoses(staffId, filters);
      return diagnoses;
    };
  
    return {
      addDiagnosis,
      getDiagnosis,
      updateDiagnosis,
      removeDiagnosis,
      getPatientDiagnoses,
      getExaminationDiagnoses,
      getMedicalStaffDiagnoses,
    };
  };
  