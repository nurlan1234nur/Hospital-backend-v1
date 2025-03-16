import mongoose from "mongoose";
const { Schema } = mongoose;

const  PrescribedMed= new Schema({
  prescribedMed_id: { type: Number, required: true, unique: true },
  name:          { type: String },
  description:   { type: String },
  dose:{type:String},
  frequency: { type:String },
  patient:       { type: Schema.Types.ObjectId, ref: "Patient" },
  medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
});

export default mongoose.model("PrescribedMed", PrescribedMedSchema);
