import { Schema, model } from 'mongoose';

const DiagnosisSchema = new Schema(
  {
    diagnosis_id: { type: Number, required: true, unique: true },
    diagnosisCode: { type: String },
    diagnosisName: {type:String},
    diagnosisDesc: { type: String },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    examination:   { type: Schema.Types.ObjectId, ref: "Examination" },
    medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  },
  { timestamps: true }
);

const Diagnosis = model('Diagnosis', DiagnosisSchema);
export default Diagnosis;
