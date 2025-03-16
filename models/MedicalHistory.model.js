import { Schema, model } from 'mongoose';

const MedicalHistorySchema = new Schema(
  {
    medical_history_code: { type: Number, required: true, unique: true },
    time_stamp: { type: String },
    treatment_procedure: { type: String },
    patient_treatment: { type: String },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  },
  { timestamps: true }
);

const MedicalHistory = model('MedicalHistory', MedicalHistorySchema);
export default MedicalHistory;
