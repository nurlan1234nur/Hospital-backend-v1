import { Schema, model } from 'mongoose';

const ExaminationSchema = new Schema(
  {
    exam_id: { type: Number, required: true, unique: true },
    exam_type: { type: String },
    exam_date: { type: Date },
    findings: { type: String },
    // Relationship: an Examination is performed by 1 Doctor and for 1 Patient
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  },
  { timestamps: true }
);

const Examination = model('Examination', ExaminationSchema);
export default Examination;

