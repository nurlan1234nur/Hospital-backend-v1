import { Schema, model } from 'mongoose';

const MedicineSchema = new Schema(
  {
    name: {type: String},
    type:{ type: String,enum: ["medication", "Supplies", "Creams", "Emergency Items"] },
    dosage:{type:String},
    price:{type: Number},
    quantity: {type: Number},
    expiryDate:{type:Date},
    medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  },
  { timestamps: true }
);

const Medicine = model('Medicine', MedicineSchema);
export default Medicine;
