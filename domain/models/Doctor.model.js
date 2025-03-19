import { Schema } from "mongoose";

import User from "./User.model.js";

const DoctorSchema = new Schema({
  specialization: { type: String },
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
});

//Mongoose's discriminator feature allows you to create specialized models that inherit from a base model.
const Doctor = User.discriminator("Doctor", DoctorSchema);

export default Doctor;
