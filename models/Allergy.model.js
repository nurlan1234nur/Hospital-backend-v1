import { Schema, model } from 'mongoose';

const AllergiesSchema = new Schema(
  {
    allergies_id: { type: Number, required: true, unique: true },
    allergy_name: { type: String },
    severity: { type: String,enum: ["mild", "moderate", "severe"] },
    reaction: { type: String },
    date_of_onset: { type: Date },
    // Relationship: an Allergies entry belongs to one Patient
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  },
  { timestamps: true }
);

const Allergies = model('Allergies', AllergiesSchema);
export default Allergies;
