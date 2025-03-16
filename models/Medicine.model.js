import { Schema, model } from 'mongoose';

const MedicineSchema = new Schema(
  {
    med_id: { type: Number, required: true, unique: true },
    name: {types: String},
    dosage:{types:String},
    price:{types: Number},
    quantity: {types: Number},
    expiryDate:{types:Date},
    medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  },
  { timestamps: true }
);

const Medicine = model('Medicine', MedicineSchema);
export default Medicine;
