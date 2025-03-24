import Patient from "../../domain/models/Patient.model.js";

export const listAllPatients = async (filters = {}) => {
  return await Patient.find(filters);
};
