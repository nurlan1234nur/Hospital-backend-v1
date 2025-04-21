import PrescribedGuide from "../../domain/models/PrescribedGuide.model.js";

// PrescribedGuide
export const createPrescribedGuide = async (prescribedGuideData) => {
    return await PrescribedGuide.create(prescribedGuideData);
  };
  
  export const findPrescribedGuideById = async (id) => {
    return await PrescribedGuide.findById(id)
      .populate("patient", "firstname lastname register sisiID")
      .populate("medicalStaff", "firstname lastname position specialization")
      .populate("prescription");
  };
  
  export const updatePrescribedGuideById = async (id, updateData) => {
    return await PrescribedGuide.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("patient", "firstname lastname register sisiID")
      .populate("medicalStaff", "firstname lastname position specialization")
      .populate("prescription");
  };
  
  export const deletePrescribedGuideById = async (id) => {
    return await PrescribedGuide.findByIdAndDelete(id);
  };
  
  export const listPrescriptionGuides = async (prescriptionId) => {
    return await PrescribedGuide.find({ prescription: prescriptionId }).populate(
      "medicalStaff",
      "firstname lastname position specialization"
    );
  };
  
  export const listPatientPrescribedGuides = async (patientId) => {
    return await PrescribedGuide.find({ patient: patientId })
      .populate("medicalStaff", "firstname lastname position specialization")
      .populate("prescription")
      .sort({ "prescription.date": -1 });
  };
  
  export const listMedicalStaffPrescribedGuides = async (staffId) => {
    return await PrescribedGuide.find({ medicalStaff: staffId })
      .populate("patient", "firstname lastname register sisiID")
      .populate("prescription")
      .sort({ "prescription.date": -1 });
  };
  