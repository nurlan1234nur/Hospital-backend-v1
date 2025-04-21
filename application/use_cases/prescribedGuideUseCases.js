import {
    createPrescribedGuide,
    findPrescribedGuideById,
    updatePrescribedGuideById,
    deletePrescribedGuideById,
    listPrescriptionGuides,
    listPatientPrescribedGuides,
    listMedicalStaffPrescribedGuides,
  } from "../../infrastructure/repositories/prescribedGuideRepository.js";
  import { createError } from "../../utils/error.js";
  
  
  // PrescribedGuide Use Cases
  export const createPrescribedGuideUseCases = () => {
    const addPrescribedGuide = async (prescribedGuideData) => {
      const prescribedGuide = await createPrescribedGuide(prescribedGuideData);
      return prescribedGuide;
    };
  
    const getPrescribedGuide = async (id) => {
      const prescribedGuide = await findPrescribedGuideById(id);
      if (!prescribedGuide) {
        throw createError("Зөвлөмжийн мэдээлэл олдсонгүй!", 404);
      }
      return prescribedGuide;
    };
  
    const updatePrescribedGuide = async (id, updateData) => {
      const prescribedGuide = await findPrescribedGuideById(id);
      if (!prescribedGuide) {
        throw createError("Зөвлөмжийн мэдээлэл олдсонгүй!", 404);
      }
  
      // Check if staff can update this prescribed guide
      if (
        updateData.staffId &&
        prescribedGuide.medicalStaff._id.toString() !== updateData.staffId
      ) {
        throw createError(
          "Зөвхөн өөрийн бичсэн зөвлөмжийг засах боломжтой!",
          403
        );
      }
  
      // Remove staffId from update data as it's not a field in the model
      if (updateData.staffId) {
        delete updateData.staffId;
      }
  
      const updatedPrescribedGuide = await updatePrescribedGuideById(
        id,
        updateData
      );
      return updatedPrescribedGuide;
    };
  
    const removePrescribedGuide = async (id, staffId) => {
      const prescribedGuide = await findPrescribedGuideById(id);
      if (!prescribedGuide) {
        throw createError("Зөвлөмжийн мэдээлэл олдсонгүй!", 404);
      }
  
      // Ensure staff can only delete their own prescribed guides
      if (prescribedGuide.medicalStaff._id.toString() !== staffId) {
        throw createError(
          "Зөвхөн өөрийн бичсэн зөвлөмжийг устгах боломжтой!",
          403
        );
      }
  
      await deletePrescribedGuideById(id);
      return {
        success: true,
        message: "Зөвлөмжийн мэдээлэл амжилттай устгагдлаа!",
      };
    };
  
    const getPrescriptionGuides = async (prescriptionId) => {
      const prescribedGuides = await listPrescriptionGuides(prescriptionId);
      return prescribedGuides;
    };
  
    const getPatientPrescribedGuides = async (patientId) => {
      const prescribedGuides = await listPatientPrescribedGuides(patientId);
      return prescribedGuides;
    };
  
    const getMedicalStaffPrescribedGuides = async (staffId) => {
      const prescribedGuides = await listMedicalStaffPrescribedGuides(staffId);
      return prescribedGuides;
    };
  
    return {
      addPrescribedGuide,
      getPrescribedGuide,
      updatePrescribedGuide,
      removePrescribedGuide,
      getPrescriptionGuides,
      getPatientPrescribedGuides,
      getMedicalStaffPrescribedGuides,
    };
  };
  