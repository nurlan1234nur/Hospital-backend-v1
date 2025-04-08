import Examination from "../../domain/models/Examination.model.js";
import Questionnaire from "../../domain/models/Question.model.js";
import DiseaseCode from "../../domain/models/Diseasecode.model.js";
import VitalSigns from "../../domain/models/Vital.model.js";




//EXAMINATIONS
export const createExamination = async (examinationData) => {
  return await Examination.create(examinationData);
};

export const findExaminationById = async (id) => {
  return await Examination.findById(id)
    .populate("medicalStaff", "firstname lastname position specialization")
    .populate("patient", "firstname lastname register sisiID");
};

export const updateExaminationById = async (id, updateData) => {
  return await Examination.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  }).populate("medicalStaff", "firstname lastname position specialization")
    .populate("patient", "firstname lastname register sisiID");
};

export const deleteExaminationById = async (id) => {
  return await Examination.findByIdAndDelete(id);
};

export const listPatientExaminations = async (patientId, filters = {}) => {
  const query = { patient: patientId, ...filters };
  
  return await Examination.find(query)
    .populate("medicalStaff", "firstname lastname position specialization")
    .sort({ exam_date: -1 }); // Sort by examination date, most recent first
};

export const listMedicalStaffExaminations = async (staffId, filters = {}) => {
  const query = { medicalStaff: staffId, ...filters };
  
  return await Examination.find(query)
    .populate("patient", "firstname lastname register sisiID")
    .sort({ exam_date: -1 }); // Sort by examination date, most recent first
};





//QUESTION buyu ASUUMJ
export const createQuestionnaire = async (questionData) => {
  return await Questionnaire.create(questionData);
};

export const findQuestionnaireById = async (id) => {
  return await Questionnaire.findById(id)
    .populate("patient", "firstname lastname register")
    .populate("examination", "exam_id exam_date")
    .populate("medicalStaff", "firstname lastname position");
};

export const updateQuestionnaireById = async (id, updateData) => {
  return await Questionnaire.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  })
    .populate("patient", "firstname lastname register")
    .populate("examination", "exam_id exam_date")
    .populate("medicalStaff", "firstname lastname position");
};

export const deleteQuestionnaireById = async (id) => {
  return await Questionnaire.findByIdAndDelete(id);
};

export const listPatientQuestionnaires = async (patientId) => {
  return await Questionnaire.find({ patient: patientId })
    .populate("examination", "exam_id exam_date")
    .populate("medicalStaff", "firstname lastname position");
};

export const listExaminationQuestionnaires = async (examinationId) => {
  return await Questionnaire.find({ examination: examinationId })
    .populate("patient", "firstname lastname register")
    .populate("medicalStaff", "firstname lastname position");
};

export const listMedicalStaffQuestionnaires = async (staffId) => {
  return await Questionnaire.find({ medicalStaff: staffId })
    .populate("patient", "firstname lastname register")
    .populate("examination", "exam_id exam_date");
};





//DISEASE

export const listAllDiseaseCodes = async (filters = {}) => {
  let query = {};
  
  // If search term is provided, search in description and value fields
  if (filters.search) {
    query = {
      $or: [
        { description: { $regex: filters.search, $options: 'i' } },
        { value: { $regex: filters.search, $options: 'i' } }
      ]
    };
  }
  
  return await DiseaseCode.find(query)
    .sort({ value: 1 }) // Sort by ICD-10 code
    .limit(filters.limit ? parseInt(filters.limit) : 0);
};

export const findDiseaseCodeById = async (id) => {
  return await DiseaseCode.findById(id);
};

export const findDiseaseCodeByValue = async (value) => {
  return await DiseaseCode.findOne({ value });
};




//VITAL SIGNS
export const createVitalSigns = async (vitalSignsData) => {
  return await VitalSigns.create(vitalSignsData);
};

export const findVitalSignsById = async (id) => {
  return await VitalSigns.findById(id)
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization");
};

export const updateVitalSignsById = async (id, updateData) => {
  return await VitalSigns.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  })
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization");
};

export const deleteVitalSignsById = async (id) => {
  return await VitalSigns.findByIdAndDelete(id);
};

export const listPatientVitalSigns = async (patientId, limit = 0) => {
  return await VitalSigns.find({ patient: patientId })
    .populate("medicalStaff", "firstname lastname position specialization")
    .sort({ date: -1, createdAt: -1 })
    .limit(limit);
};

export const getLatestVitalSignsByPatient = async (patientId) => {
  return await VitalSigns.findOne({ patient: patientId })
    .sort({ date: -1, createdAt: -1 })
    .populate("patient", "firstname lastname register sisiID")
    .populate("medicalStaff", "firstname lastname position specialization");
};

export const listVitalSignsByDateRange = async (patientId, startDate, endDate) => {
  return await VitalSigns.find({
    patient: patientId,
    date: { 
      $gte: new Date(startDate), 
      $lte: new Date(endDate) 
    }
  })
    .populate("medicalStaff", "firstname lastname position specialization")
    .sort({ date: -1 });
};

export const listMedicalStaffVitalSigns = async (staffId, limit = 0) => {
  return await VitalSigns.find({ medicalStaff: staffId })
    .populate("patient", "firstname lastname register sisiID")
    .sort({ date: -1, createdAt: -1 })
    .limit(limit);
};
