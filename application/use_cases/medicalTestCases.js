import medicalTestRepository from "../../infrastructure/repositories/medicalTestRepository.js";

export const createMedicalTest = async (data) => {
  return await medicalTestRepository.create(data);
};

export const getAllMedicalTests = async () => {
  return await medicalTestRepository.findAll();
};

export const getMedicalTestById = async (id) => {
  return await medicalTestRepository.findById(id);
};

export const updateMedicalTest = async (id, data) => {
  return await medicalTestRepository.updateById(id, data);
};

export const deleteMedicalTest = async (id) => {
  return await medicalTestRepository.deleteById(id);
};
