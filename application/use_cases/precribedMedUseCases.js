import {
    createPrescribedMed,
    findPrescribedMedById,
    updatePrescribedMedById,
    deletePrescribedMedById,
    listPrescriptionMeds,
    listPatientPrescribedMeds,
    listMedicalStaffPrescribedMeds,
  } from "../../infrastructure/repositories/prescribedMedRepository.js";
  import { createError } from "../../utils/error.js";
  
  
  
  // PRESCRIBED MEDICINE
  export const createPrescribedMedUseCases = () => {
    const addPrescribedMed = async (prescribedMedData) => {
      const prescribedMed = await createPrescribedMed(prescribedMedData);
      return prescribedMed;
    };
  
    const getPrescribedMed = async (id) => {
      const prescribedMed = await findPrescribedMedById(id);
      if (!prescribedMed) {
        throw createError("Эмийн жорын мэдээлэл олдсонгүй!", 404);
      }
      return prescribedMed;
    };
  
    const updatePrescribedMed = async (id, updateData) => {
      const prescribedMed = await findPrescribedMedById(id);
      if (!prescribedMed) {
        throw createError("Эмийн жорын мэдээлэл олдсонгүй!", 404);
      }
  
      // Check if staff can update this prescribed med
      if (
        updateData.staffId &&
        prescribedMed.medicalStaff._id.toString() !== updateData.staffId
      ) {
        throw createError(
          "Зөвхөн өөрийн бичсэн эмийн жорыг засах боломжтой!",
          403
        );
      }
  
      // Remove staffId from update data as it's not a field in the model
      if (updateData.staffId) {
        delete updateData.staffId;
      }
  
      const updatedPrescribedMed = await updatePrescribedMedById(id, updateData);
      return updatedPrescribedMed;
    };
  
    const removePrescribedMed = async (id, staffId) => {
      const prescribedMed = await findPrescribedMedById(id);
      if (!prescribedMed) {
        throw createError("Эмийн жорын мэдээлэл олдсонгүй!", 404);
      }
  
      // Ensure staff can only delete their own prescribed meds
      if (prescribedMed.medicalStaff._id.toString() !== staffId) {
        throw createError(
          "Зөвхөн өөрийн бичсэн эмийн жорыг устгах боломжтой!",
          403
        );
      }
  
      await deletePrescribedMedById(id);
      return {
        success: true,
        message: "Эмийн жорын мэдээлэл амжилттай устгагдлаа!",
      };
    };
  
    const getPrescriptionMeds = async (prescriptionId) => {
      const prescribedMeds = await listPrescriptionMeds(prescriptionId);
      return prescribedMeds;
    };
  
    const getPatientPrescribedMeds = async (patientId) => {
      const prescribedMeds = await listPatientPrescribedMeds(patientId);
      return prescribedMeds;
    };
  
    const getMedicalStaffPrescribedMeds = async (staffId) => {
      const prescribedMeds = await listMedicalStaffPrescribedMeds(staffId);
      return prescribedMeds;
    };
  
    return {
      addPrescribedMed,
      getPrescribedMed,
      updatePrescribedMed,
      removePrescribedMed,
      getPrescriptionMeds,
      getPatientPrescribedMeds,
      getMedicalStaffPrescribedMeds,
    };
  };