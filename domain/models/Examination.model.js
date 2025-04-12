import { Schema, model } from 'mongoose';

const ExaminationSchema = new Schema(
  {
    exam_date: { type: Date },
    doctors_examination: { type: String, enum: ["Initial", "Follow-up","Preventive","Active Monitoring", "Home Visit","House Call"] },
    exam_type: { type: String },
    illness: { type: String },
    surgery: { type: String },
    callback: { type: Boolean },
    reason: { type: String},
    sendToHigherLevel: { type: Boolean },
    isVioleted: { type: Boolean },
    sickDays: { type: Number },
    // Relationship: an Examination is performed by 1 Doctor and for 1 Patient
    vital: { type: Schema.Types.ObjectId, ref: "Vital" },
    medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    
  },
  { timestamps: true }
);

const Examination = model('Examination', ExaminationSchema);
export default Examination;

