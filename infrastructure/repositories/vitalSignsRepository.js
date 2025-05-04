
import VitalSigns from "../../domain/models/Vital.model.js";

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
    runValidators: true,
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

export const listVitalSignsByDateRange = async (
  patientId,
  startDate,
  endDate
) => {
  return await VitalSigns.find({
    patient: patientId,
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
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
  
  