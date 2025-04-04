import mongoose from "mongoose";
const { Schema } = mongoose;

const questionnaireSchema = new Schema({
  question_id: { type: Number, required: true, unique: true },
  question:     { type: String },
  answer: { type: String },
  patient:   { type: Schema.Types.ObjectId, ref: "Patient" },
  examination:   { type: Schema.Types.ObjectId, ref: "Examination" },
  medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
});

export default mongoose.model("Question", questionnaireSchema);
