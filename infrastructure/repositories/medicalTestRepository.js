import MedicalTest from "../../domain/models/MedicalTest.model.js";
import { createError } from "../../utils/error.js"; 

const create = async (data) => {
  return await MedicalTest.create(data);
};

const findAll = async () => {
  return await MedicalTest.find().populate("patients");
};

const findById = async (id) => {
  return await MedicalTest.findById(id).populate("patients");
};

const updateById = async (id, data) => {
  return await MedicalTest.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id) => {
  return await MedicalTest.findByIdAndDelete(id);
};

export default {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};
