import {
  createExamination,
  findExaminationById,
  updateExaminationById,
  deleteExaminationById,
  listPatientExaminations,
  listMedicalStaffExaminations,
  createQuestionnaire,
  findQuestionnaireById,
  updateQuestionnaireById,
  deleteQuestionnaireById,
  listPatientQuestionnaires,
  listExaminationQuestionnaires,
  listMedicalStaffQuestionnaires,
  listAllDiseaseCodes,
  findDiseaseCodeById,
  findDiseaseCodeByValue,
  } from "../../infrastructure/repositories/medicalStaffRepository.js";
  import { createError } from "../../utils/error.js";

  //UZLEG 
  
  export const createExaminationUseCases = () => {
    const addExamination = async (examinationData) => {
  
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
      
      // Check if staff can update this examination 
      if (updateData.staffId && examination.medicalStaff._id.toString() !== updateData.staffId) {
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
      if (examination.medicalStaff.id.toString() !== staffId) {
        throw createError("Зөвхөн өөрийн бүртгэсэн үзлэгийг устгах боломжтой!", 403);
      }
      
      await deleteExaminationById(id);
      return { success: true, message: "Үзлэгийн мэдээлэл амжилттай устгагдлаа!" };
    };
  
    const getPatientExaminations = async (patientId, filters = {}) => {
      const examinations = await listPatientExaminations(patientId, filters);
      return examinations;
    };
    const getMedicalStaffExaminations = async (staffId, filters = {}) => {
      const examinations = await listMedicalStaffExaminations(staffId, filters);
      return examinations;
    };
  
    return {
      addExamination,
      getExamination,
      updateExamination,
      removeExamination,
      getPatientExaminations,
      getMedicalStaffExaminations 
    };
  };

  //QUESTION
  
  export const createQuestionnaireUseCases = () => {
    const addQuestionnaire = async (questionData) => {
      // Generate unique question_id
      const questionId = Date.now();
      
      const questionnaire = await createQuestionnaire({
        ...questionData,
        question_id: questionId
      });
      
      return questionnaire;
    };
  
    const getQuestionnaire = async (id) => {
      const questionnaire = await findQuestionnaireById(id);
      if (!questionnaire) {
        throw createError("Асуумжийн мэдээлэл олдсонгүй!", 404);
      }
      return questionnaire;
    };
  
    const updateQuestionnaire = async (id, updateData) => {
      const questionnaire = await findQuestionnaireById(id);
      if (!questionnaire) {
        throw createError("Асуумжийн мэдээлэл олдсонгүй!", 404);
      }
      
      // Check if staff can update this questionnaire
      if (updateData.staffId && questionnaire.medicalStaff.id.toString() !== updateData.staffId) {
        throw createError("Зөвхөн өөрийн үүсгэсэн асуумжийг засах боломжтой!", 403);
      }
      
      // Remove staffId from update data as it's not a field in the model
      if (updateData.staffId) {
        delete updateData.staffId;
      }
      
      const updatedQuestionnaire = await updateQuestionnaireById(id, updateData);
      return updatedQuestionnaire;
    };
  
    const removeQuestionnaire = async (id, staffId) => {
      const questionnaire = await findQuestionnaireById(id);
      if (!questionnaire) {
        throw createError("Асуумжийн мэдээлэл олдсонгүй!", 404);
      }
      
      // Check if staff can delete this questionnaire
      if (staffId && questionnaire.medicalStaff.id.toString() !== staffId) {
        throw createError("Зөвхөн өөрийн үүсгэсэн асуумжийг устгах боломжтой!", 403);
      }
      
      await deleteQuestionnaireById(id);
      return { success: true, message: "Асуумжийн мэдээлэл амжилттай устгагдлаа!" };
    };
  
    const getPatientQuestionnaires = async (patientId) => {
      const questionnaires = await listPatientQuestionnaires(patientId);
      return questionnaires;
    };
  
    const getExaminationQuestionnaires = async (examinationId) => {
      const questionnaires = await listExaminationQuestionnaires(examinationId);
      return questionnaires;
    };
  
    const getMedicalStaffQuestionnaires = async (staffId) => {
      const questionnaires = await listMedicalStaffQuestionnaires(staffId);
      return questionnaires;
    };
  
    return {
      addQuestionnaire,
      getQuestionnaire,
      updateQuestionnaire,
      removeQuestionnaire,
      getPatientQuestionnaires,
      getExaminationQuestionnaires,
      getMedicalStaffQuestionnaires
    };
  };
  //DISEASES

  export const createDiseaseCodeUseCases = () => {
    const listDiseaseCodes = async (filters = {}) => {
      const diseaseCodes = await listAllDiseaseCodes(filters);
      return diseaseCodes;
    };
  
    const getDiseaseCodeById = async (id) => {
      const diseaseCode = await findDiseaseCodeById(id);
      if (!diseaseCode) {
        throw createError("Өвчний код олдсонгүй!", 404);
      }
      return diseaseCode;
    };
  
    const getDiseaseCodeByValue = async (value) => {
      const diseaseCode = await findDiseaseCodeByValue(value);
      if (!diseaseCode) {
        throw createError("Өвчний код олдсонгүй!", 404);
      }
      return diseaseCode;
    };
  
    
  
    return {
      listDiseaseCodes,
      getDiseaseCodeById,
      getDiseaseCodeByValue,
    };
  };


