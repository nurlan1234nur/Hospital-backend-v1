import mongoose from "mongoose";
const { Schema } = mongoose;

const  Prescription= new Schema({
  prescrtiption_id: { type: Number, required: true, unique: true },
  date: {type:Date},
  prescribedBy:{ type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  patient:       { type: Schema.Types.ObjectId, ref: "Patient" },
});

export default mongoose.model("Prescription", PrescriptionSchema);
