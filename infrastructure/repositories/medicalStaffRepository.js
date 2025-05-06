import MedicalStaff from "../../domain/models/MedicalStaff.model.js";

export const listAllMedicalStaff = async (filters = {}) => {
  return await MedicalStaff.find(filters);
};

export const findMedicalStaffById = async (id) => {
  return await MedicalStaff.findById(id);
};

export const createMedicalStaff = async (data) => {
  return await MedicalStaff.create(data);
};

export const updateMedicalStaffById = async (id, updateData) => {
  return await MedicalStaff.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};

export const deleteMedicalStaffById = async (id) => {
  return await MedicalStaff.findByIdAndDelete(id);
};
