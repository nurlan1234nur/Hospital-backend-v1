// infrastructure/repositories/userRepository.js
import Patient from "../../domain/models/Patient.model.js";
import User from "../../domain/models/User.model.js";
import Admin from "../../domain/models/Admin.model.js";
import Doctor from "../../domain/models/Doctor.model.js";
import Nurse from "../../domain/models/Nurse.model.js";

export const createPatient = async (patientData) => {
  return await Patient.create(patientData);
};

export const createDoctor = async (staffData) => {
  return await Doctor.create(staffData);
};
export const createNurse = async (staffData) => {
  return await Nurse.create(staffData);
};
export const createAdmin = async (adminData) => {
  return await Admin.create(adminData);
};
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
