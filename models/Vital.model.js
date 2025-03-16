import { Schema, model } from 'mongoose';

const VitalSignsSchema = new Schema(
  {
    vital_signs_id: { type: Number, required: true, unique: true },
    heart_rate: { type: Number },
    blood_pressure: { type: String },
    temperature: { type: Number },
    respiration_rate: { type: Number },
    oxygen_saturation: { type: Number },
    // Relationship: a VitalSigns entry belongs to one Patient
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    examination:   { type: Schema.Types.ObjectId, ref: "Examination" }
  },
  { timestamps: true }
);

const VitalSigns = model('VitalSigns', VitalSignsSchema);
export default VitalSigns;
