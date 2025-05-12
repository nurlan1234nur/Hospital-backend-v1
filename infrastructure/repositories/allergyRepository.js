import Allergies from "../../domain/models/Allergy.model.js";

export const createAllergy = async (allergyData) => {
    return await Allergies.create(allergyData);
  };
  
  export const findAllergyById = async (id) => {
    return await Allergies.findById(id);
  };
  
  export const updateAllergyById = async (id, updateData) => {
    return await Allergies.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  };
  
  export const deleteAllergyById = async (id) => {
    return await Allergies.findByIdAndDelete(id);
  };
  
  export const listPatientAllergies = async (patientId) => {
    return await Allergies.find({ patient: patientId })
      .sort({ date_of_onset: -1 });
  };
  
  