import {
    createPrescription,
    findPrescriptionById,
    updatePrescriptionById,
    deletePrescriptionById,
    listPatientPrescriptions,
    listMedicalStaffPrescriptions,
  } from "../../infrastructure/repositories/prescriptionRepository.js";
  import { createError } from "../../utils/error.js";
//PRESCRIPTION
export const createPrescriptionUseCases = () => {
    const addPrescription = async (prescriptionData) => {
      const prescription = await createPrescription({
        ...prescriptionData,
        date: prescriptionData.date || new Date(),
      });
  
      return prescription;
    };
  
    const getPrescription = async (id) => {
      const prescription = await findPrescriptionById(id);
      if (!prescription) {
        throw createError("Жорын мэдээлэл олдсонгүй!", 404);
      }
      return prescription;
    };
  
    const updatePrescription = async (id, updateData) => {
      const prescription = await findPrescriptionById(id);
      if (!prescription) {
        throw createError("Жорын мэдээлэл олдсонгүй!", 404);
      }
  
      // Check if staff can update this prescription
      if (
        updateData.staffId &&
        prescription.prescribedBy._id.toString() !== updateData.staffId
      ) {
        throw createError("Зөвхөн өөрийн бичсэн жорыг засах боломжтой!", 403);
      }
  
      // Remove staffId from update data as it's not a field in the model
      if (updateData.staffId) {
        delete updateData.staffId;
      }
  
      const updatedPrescription = await updatePrescriptionById(id, updateData);
      return updatedPrescription;
    };
  
    const removePrescription = async (id, staffId) => {
      const prescription = await findPrescriptionById(id);
      if (!prescription) {
        throw createError("Жорын мэдээлэл олдсонгүй!", 404);
      }
  
      // Ensure staff can only delete their own prescriptions
      if (prescription.prescribedBy._id.toString() !== staffId) {
        throw createError("Зөвхөн өөрийн бичсэн жорыг устгах боломжтой!", 403);
      }
  
      await deletePrescriptionById(id);
      return { success: true, message: "Жорын мэдээлэл амжилттай устгагдлаа!" };
    };
  
    const getPatientPrescriptions = async (patientId) => {
      const prescriptions = await listPatientPrescriptions(patientId);
      return prescriptions;
    };
  
    const getMedicalStaffPrescriptions = async (staffId) => {
      const prescriptions = await listMedicalStaffPrescriptions(staffId);
      return prescriptions;
    };
  
    return {
      addPrescription,
      getPrescription,
      updatePrescription,
      removePrescription,
      getPatientPrescriptions,
      getMedicalStaffPrescriptions,
    };
  };
  