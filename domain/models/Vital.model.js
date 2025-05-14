import { Schema, model } from 'mongoose';

const VitalSignsSchema = new Schema(
  {
    vital_signs_id: {type: Number, unique: true, required: true},
    date:{type:Date},
    concsiousness_status:{type:String},
    right_diastolic:{type:Number},
    right_mean_arterial_pressure:{type:Number},
    right_heart_rate: { type: Number },
    right_systolic:{type:Number},
    right_note:{type:String},
    left_diastolic:{type:Number},
    left_mean_arterial_pressure:{type:Number},
    left_heart_rate: { type: Number },
    left_systolic:{type:Number},
    left_note:{type:String},
    temperature: { type: Number },
    respiration_rate: { type: Number },
    saturation: { type: Number },
    height: {type:Number},
    weight: {type:Number},
    // Relationship: a VitalSigns entry belongs to one Patient
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  },
  { timestamps: true }
);

const VitalSigns = model('VitalSigns', VitalSignsSchema);
export default VitalSigns;