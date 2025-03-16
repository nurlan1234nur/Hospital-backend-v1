import mongoose from "mongoose";
const { Schema } = mongoose;

const  PrescribedGuide= new Schema({
  prescribedGuide_id: { type: Number, required: true, unique: true },
  name:          { type: String },
  description:   { type: String },
  dose:{type:String},
  frequency: { type:String },
  patient:       { type: Schema.Types.ObjectId, ref: "Patient" },
  medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
});

export default mongoose.model("PrescribedGuide", PrescribedGuideSchema);
