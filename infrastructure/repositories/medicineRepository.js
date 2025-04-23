import Medicine from "../../domain/models/Medicine.model.js";

// Medicine Repository
export const createMedicine = async (medicineData) => {
  return await Medicine.create(medicineData);
};

export const findMedicineById = async (id) => {
  return await Medicine.findById(id)
    .populate("medicalStaff", "firstname lastname position specialization");
};

export const updateMedicineById = async (id, updateData) => {
  return await Medicine.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate("medicalStaff", "firstname lastname position specialization");
};

export const deleteMedicineById = async (id) => {
  return await Medicine.findByIdAndDelete(id);
};

export const listAllMedicines = async () => {
  return await Medicine.find()
    .populate("medicalStaff", "firstname lastname position specialization")
    .sort({ name: 1 }); // Sort by name alphabetically
};

export const listMedicinesByMedicalStaff = async (staffId) => {
  return await Medicine.find({ medicalStaff: staffId })
    .sort({ name: 1 }); // Sort by name alphabetically
};

export const searchMedicinesByName = async (searchTerm) => {
  return await Medicine.find({ 
    name: { $regex: searchTerm, $options: 'i' } 
  }).populate("medicalStaff", "firstname lastname position specialization");
};

export const getMedicinesByExpiryDate = async (startDate, endDate) => {
  return await Medicine.find({
    expiryDate: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  }).populate("medicalStaff", "firstname lastname position specialization");
};

export const getLowStockMedicines = async (threshold = 10) => {
  return await Medicine.find({
    quantity: { $lte: threshold }
  }).populate("medicalStaff", "firstname lastname position specialization");
};