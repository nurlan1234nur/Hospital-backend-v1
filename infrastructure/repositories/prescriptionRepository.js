import Prescription from "../../domain/models/Prescription.model.js";

//Prescription
export const createPrescription = async (prescriptionData) => {
    return await Prescription.create(prescriptionData);
  };
  
  export const findPrescriptionById = async (id) => {
    return await Prescription.findById(id)
      .populate("prescribedBy", "firstname lastname position specialization")
      .populate("patient", "firstname lastname register sisiID");
  };
  
  export const updatePrescriptionById = async (id, updateData) => {
    return await Prescription.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("prescribedBy", "firstname lastname position specialization")
      .populate("patient", "firstname lastname register sisiID");
  };
  
  export const deletePrescriptionById = async (id) => {
    return await Prescription.findByIdAndDelete(id);
  };
  
  export const listPatientPrescriptions = async (patientId) => {
    return await Prescription.find({ patient: patientId })
      .populate("prescribedBy", "firstname lastname position specialization")
      .sort({ date: -1 }); // Sort by date, most recent first
  };
  
  export const listMedicalStaffPrescriptions = async (staffId) => {
    return await Prescription.find({ prescribedBy: staffId })
      .populate("patient", "firstname lastname register sisiID")
      .sort({ date: -1 }); // Sort by date, most recent first
  };
  