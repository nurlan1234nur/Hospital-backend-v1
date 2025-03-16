// models/Questionnaire.model.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const questionnaireSchema = new Schema({
  Question:     { type: String },
  answer: [{ type: String }],
  patient:   { type: Schema.Types.ObjectId, ref: "Patient" },
  examination:   { type: Schema.Types.ObjectId, ref: "Examination" },
});

export default mongoose.model("Question", questionnaireSchema);
