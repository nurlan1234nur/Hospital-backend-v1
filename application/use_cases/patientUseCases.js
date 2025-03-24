import bcrypt from "bcrypt";
import { listAllPatients } from "../../infrastructure/repositories/patientRepository.js";
import { createError } from "../../utils/error.js";

export const createPatientUseCases = () => {
  const listPatients = async (filters = {}) => {
    const patients = await listAllPatients(filters);
    return patients;
  };

  return {
    listPatients,
  };
};
