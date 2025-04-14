import Medicine from "../../domain/models/Medicine.model.js";
// MedicineRepository.js
import { createError } from "../../utils/error.js"; 

const create = async (data) => {
  return await Medicine.create(data);
};

const findAll = async () => {
  return await Medicine.find().populate("medicalStaff");
};

const findById = async (id) => {
  return await Medicine.findById(id).populate("medicalStaff");
};

const updateById = async (id, data) => {
  return await Medicine.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id) => {
  return await Medicine.findByIdAndDelete(id);
};

export default {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};
