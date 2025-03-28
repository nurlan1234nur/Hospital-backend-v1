import {
    createExamination,
    findExaminationById,
    updateExaminationById,
    deleteExaminationById,
    listPatientExaminations
  } from "../../infrastructure/repositories/medicalStaffRepository.js";
  import { createError } from "../../utils/error.js";
  
  export const createExaminationUseCases = () => {
    const addExamination = async (examinationData) => {
      // Generate unique exam_id (you may have a different strategy)
      const examId = Date.now();
      
      const examination = await createExamination({
        ...examinationData,
        exam_id: examId,
        exam_date: examinationData.exam_date || new Date()
      });
      
      return examination;
    };
  
    const getExamination = async (id) => {
      const examination = await findExaminationById(id);
      if (!examination) {
        throw createError("Үзлэгийн мэдээлэл олдсонгүй!", 404);
      }
      return examination;
    };
  
    const updateExamination = async (id, updateData) => {
      const examination = await findExaminationById(id);
      if (!examination) {
        throw createError("Үзлэгийн мэдээлэл олдсонгүй!", 404);
      }
      
      // Ensure staff can only update their own examinations
      if (updateData.staffId && examination.medicalStaff.toString() !== updateData.staffId) {
        throw createError("Зөвхөн өөрийн бүртгэсэн үзлэгийг засах боломжтой!", 403);
      }
      
      // Remove staffId from update data as it's not a field in the model
      if (updateData.staffId) {
        delete updateData.staffId;
      }
      
      const updatedExamination = await updateExaminationById(id, updateData);
      return updatedExamination;
    };
  
    const removeExamination = async (id, staffId) => {
      const examination = await findExaminationById(id);
      if (!examination) {
        throw createError("Үзлэгийн мэдээлэл олдсонгүй!", 404);
      }
      
      // Ensure staff can only delete their own examinations
      if (examination.medicalStaff.toString() !== staffId) {
        throw createError("Зөвхөн өөрийн бүртгэсэн үзлэгийг устгах боломжтой!", 403);
      }
      
      await deleteExaminationById(id);
      return { success: true, message: "Үзлэгийн мэдээлэл амжилттай устгагдлаа!" };
    };
  
    const getPatientExaminations = async (patientId, filters = {}) => {
      const examinations = await listPatientExaminations(patientId, filters);
      return examinations;
    };
  
    return {
      addExamination,
      getExamination,
      updateExamination,
      removeExamination,
      getPatientExaminations
    };
  };