import medicineRepository from "../../infrastructure/repositories/medicineRepository.js";
import { createError } from "../../utils/error.js";

export const createMedicine = async (data) => {
  return await medicineRepository.create(data);
};

export const getAllMedicine = async () => {
  return await medicineRepository.findAll();
};

export const getMedicineById = async (id) => {
  return await medicineRepository.findById(id);
};

export const updateMedicine = async (id, data) => {
  return await medicineRepository.updateById(id, data);
};

export const deleteMedicine = async (id) => {
  return await medicineRepository.deleteById(id);
};
