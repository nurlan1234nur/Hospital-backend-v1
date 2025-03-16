import { Schema, model } from 'mongoose';

const TreatmentSchema = new Schema(
  {
    treatment_id: { type: Number, required: true, unique: true },
    date: {type:Date},
    treatmentType: {type:String, enum:["Uvch","Bumba","Sharlaga","Dusal","Taria"]},
    diagnosisType: { type: String, enum:["in", "out"] },
    howManyTimes: {type:Number},
    howManyDone: {type:Number},
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    medicalStaff: { type: Schema.Types.ObjectId, ref: "MedicalStaff" },
  },
  { timestamps: true }
);

const Treatment = model('Treatment', TreatmentSchema);
export default Treatment;
