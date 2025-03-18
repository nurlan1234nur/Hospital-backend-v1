import Patient from "../../domain/models/Patient.model.js";
import User from "../../domain/models/User.model.js";

export const createPatient = async (patientData) => {
  return await Patient.create(patientData);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};


