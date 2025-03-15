import User from "./User.model.js";
import { Schema } from "mongoose";

const patientSchema = new Schema({
  register: { type: String },
  address: { type: String },
  occupation: { type: String },
  education: { type: String },
  workPlace: { type: String },
  birthOfDate: { type: Date },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
});

const Patient = User.discriminator("Patient", patientSchema);

export default Patient;
