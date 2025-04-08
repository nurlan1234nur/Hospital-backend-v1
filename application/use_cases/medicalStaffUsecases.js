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
  createVitalSigns,
  findVitalSignsById,
  updateVitalSignsById,
  deleteVitalSignsById,
  listPatientVitalSigns,
  getLatestVitalSignsByPatient,
  listVitalSignsByDateRange,
  listMedicalStaffVitalSigns
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



  //VITAL SIGNS
  export const createVitalSignsUseCases = () => {
    const addVitalSigns = async (vitalSignsData) => {
      // Generate unique vital_signs_id
      const vitalId = Date.now();
      
      // If date isn't provided, use current date
      if (!vitalSignsData.date) {
        vitalSignsData.date = new Date();
      }
      
      const vitalSigns = await createVitalSigns({
        ...vitalSignsData,
        vital_signs_id: vitalId,
      });
      
      return vitalSigns;
    };
  
    const getVitalSigns = async (id) => {
      const vitalSigns = await findVitalSignsById(id);
      if (!vitalSigns) {
        throw createError("Амин үзүүлэлтийн мэдээлэл олдсонгүй!", 404);
      }
      return vitalSigns;
    };
  
    const updateVitalSigns = async (id, updateData) => {
      const vitalSigns = await findVitalSignsById(id);
      if (!vitalSigns) {
        throw createError("Амин үзүүлэлтийн мэдээлэл олдсонгүй!", 404);
      }
      
      // Ensure staff can only update vital signs they recorded
      if (updateData.staffId && vitalSigns.medicalStaff._id.toString() !== updateData.staffId) {
        throw createError("Зөвхөн өөрийн бүртгэсэн амин үзүүлэлтийг засах боломжтой!", 403);
      }
      
      // Remove staffId from update data as it's not a field in the model
      if (updateData.staffId) {
        delete updateData.staffId;
      }
      
      const updatedVitalSigns = await updateVitalSignsById(id, updateData);
      return updatedVitalSigns;
    };
  
    const removeVitalSigns = async (id, staffId) => {
      const vitalSigns = await findVitalSignsById(id);
      if (!vitalSigns) {
        throw createError("Амин үзүүлэлтийн мэдээлэл олдсонгүй!", 404);
      }
      
      // Ensure staff can only delete vital signs they recorded
      if (staffId && vitalSigns.medicalStaff._id.toString() !== staffId) {
        throw createError("Зөвхөн өөрийн бүртгэсэн амин үзүүлэлтийг устгах боломжтой!", 403);
      }
      
      await deleteVitalSignsById(id);
      return { success: true, message: "Амин үзүүлэлтийн мэдээлэл амжилттай устгагдлаа!" };
    };
  
    const getPatientVitalSignsHistory = async (patientId, limit = 0) => {
      const vitalSigns = await listPatientVitalSigns(patientId, limit);
      return vitalSigns;
    };
  
    const getLatestVitalSigns = async (patientId) => {
      const vitalSigns = await getLatestVitalSignsByPatient(patientId);
      if (!vitalSigns) {
        throw createError("Өвчтөний амин үзүүлэлтийн мэдээлэл олдсонгүй!", 404);
      }
      return vitalSigns;
    };
  
    const getVitalSignsByDateRange = async (patientId, startDate, endDate) => {
      if (!startDate || !endDate) {
        throw createError("Эхлэх ба дуусах огноог заавал оруулна уу!", 400);
      }
      
      const vitalSigns = await listVitalSignsByDateRange(patientId, startDate, endDate);
      return vitalSigns;
    };
  
    const getMedicalStaffVitalSigns = async (staffId, limit = 0) => {
      const vitalSigns = await listMedicalStaffVitalSigns(staffId, limit);
      return vitalSigns;
    };
  
    return {
      addVitalSigns,
      getVitalSigns,
      updateVitalSigns,
      removeVitalSigns,
      getPatientVitalSignsHistory,
      getLatestVitalSigns,
      getVitalSignsByDateRange,
      getMedicalStaffVitalSigns
    };
  };

