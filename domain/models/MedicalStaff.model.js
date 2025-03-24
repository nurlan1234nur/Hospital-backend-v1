import { Schema } from "mongoose";

import User from "./User.model.js";

const MedicalStaffSchema = new Schema({
  position: { type: String, enum: ["Doctor", "Nurse"] },
  specialization: { type: String },
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
});

//Mongoose's discriminator feature allows you to create specialized models that inherit from a base model.
const MedicalStaff = User.discriminator("MedicalStaff", MedicalStaffSchema);

export default MedicalStaff;
