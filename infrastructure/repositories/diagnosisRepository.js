import Diagnosis from "../../domain/models/Diagnosis.model.js";

//DIAGNOSIS
export const createDiagnosis = async (diagnosisData) => {
    return await Diagnosis.create(diagnosisData);
  };
  
  export const findDiagnosisById = async (id) => {
    return await Diagnosis.findById(id)
      .populate("patient", "firstname lastname register sisiID")
      .populate("medicalStaff", "firstname lastname position specialization")
      .populate("diagnosisCode", "name description value")
      .populate("examination", "exam_id exam_date");
  };
  
  export const updateDiagnosisById = async (id, updateData) => {
    return await Diagnosis.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("patient", "firstname lastname register sisiID")
      .populate("medicalStaff", "firstname lastname position specialization")
      .populate("diagnosisCode", "name description value")
      .populate("examination", "exam_id exam_date");
  };
  
  export const deleteDiagnosisById = async (id) => {
    return await Diagnosis.findByIdAndDelete(id);
  };
  
  export const listPatientDiagnoses = async (patientId, filters = {}) => {
    const query = { patient: patientId, ...filters };
  
    return await Diagnosis.find(query)
      .populate("medicalStaff", "firstname lastname position specialization")
      .populate("diagnosisCode", "name description value")
      .populate("examination", "exam_id exam_date")
      .sort({ createdAt: -1 }); // Sort by creation date, most recent first
  };
  
  export const listExaminationDiagnoses = async (examinationId) => {
    return await Diagnosis.find({ examination: examinationId })
      .populate("patient", "firstname lastname register sisiID")
      .populate("medicalStaff", "firstname lastname position specialization")
      .populate("diagnosisCode", "name description value")
      .sort({ createdAt: -1 });
  };
  
  export const listMedicalStaffDiagnoses = async (staffId, filters = {}) => {
    const query = { medicalStaff: staffId, ...filters };
  
    return await Diagnosis.find(query)
      .populate("patient", "firstname lastname register sisiID")
      .populate("diagnosisCode", "name description value")
      .populate("examination", "exam_id exam_date")
      .sort({ createdAt: -1 }); // Sort by creation date, most recent first
  };

  