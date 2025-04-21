import PrescribedMed from "../../domain/models/PrescribedMed.model.js";

// PrescribedMed
export const createPrescribedMed = async (prescribedMedData) => {
    return await PrescribedMed.create(prescribedMedData);
  };
  
  export const findPrescribedMedById = async (id) => {
    return await PrescribedMed.findById(id)
      .populate("patient", "firstname lastname register sisiID")
      .populate("medicalStaff", "firstname lastname position specialization")
      .populate("prescription");
  };
  
  export const updatePrescribedMedById = async (id, updateData) => {
    return await PrescribedMed.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("patient", "firstname lastname register sisiID")
      .populate("medicalStaff", "firstname lastname position specialization")
      .populate("prescription");
  };
  
  export const deletePrescribedMedById = async (id) => {
    return await PrescribedMed.findByIdAndDelete(id);
  };
  
  export const listPrescriptionMeds = async (prescriptionId) => {
    return await PrescribedMed.find({ prescription: prescriptionId }).populate(
      "medicalStaff",
      "firstname lastname position specialization"
    );
  };
  
  export const listPatientPrescribedMeds = async (patientId) => {
    return await PrescribedMed.find({ patient: patientId })
      .populate("medicalStaff", "firstname lastname position specialization")
      .populate("prescription")
      .sort({ "prescription.date": -1 });
  };
  
  export const listMedicalStaffPrescribedMeds = async (staffId) => {
    return await PrescribedMed.find({ medicalStaff: staffId })
      .populate("patient", "firstname lastname register sisiID")
      .populate("prescription")
      .sort({ "prescription.date": -1 });
  };