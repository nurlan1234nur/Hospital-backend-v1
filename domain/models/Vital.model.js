import { Schema, model } from 'mongoose';

const VitalSignsSchema = new Schema(
  {
    vital_signs_id: { type: Number, unique: true, required: true },
    date: { type: Date },
    concsiousness_status: { type: String },
    
    // Right arm measurements
    right_diastolic: { type: Number },
    right_mean_arterial_pressure: { type: Number },
    right_heart_rate: { type: Number },
    right_systolic: { type: Number },
    right_note: { type: String },
    
    // Left arm measurements
    left_diastolic: { type: Number },
    left_mean_arterial_pressure: { type: Number },
    left_heart_rate: { type: Number },
    left_systolic: { type: Number },
    left_note: { type: String },
    
    // Other vitals
    temperature: { type: Number },
    respiration_rate: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    bmi: { type: Number },
    saturation: { type: Number },
    
    // Relationships
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  },
  { timestamps: true }
);

const VitalSigns = model('VitalSigns', VitalSignsSchema);
export default VitalSigns;
