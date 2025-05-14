import { Schema, model } from 'mongoose';

const MedicineUsageSchema = new Schema(
  {
    medicine: { type: Schema.Types.ObjectId, ref: 'Medicine', required: true },
    usedBy: { type: Schema.Types.ObjectId, ref: 'MedicalStaff', required: true },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' }, // optional: who received it
    quantityUsed: { type: Number, required: true },
    dateUsed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const MedicineUsage = model('MedicineUsage', MedicineUsageSchema);

export default MedicineUsage;
