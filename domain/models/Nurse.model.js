import { Schema } from "mongoose";

import User from "./User.model.js";

const NurseStaffSchema = new Schema({
  specialization: { type: String },
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
});

//Mongoose's discriminator feature allows you to create specialized models that inherit from a base model.
const Nurse = User.discriminator("Nurse", NurseStaffSchema);

export default Nurse;
