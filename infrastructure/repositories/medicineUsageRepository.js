// infrastructure/repositories/medicineUsage.repository.js
import MedicineUsage from '../../domain/models/MedicineUsage.model.js';

export const createMedicineUsage = async (usageData) => {
  return await MedicineUsage.create(usageData);
};

export const getUsageByMedicine = async (medicineId) => {
  return await MedicineUsage.find({ medicine: medicineId }).populate('usedBy', 'firstname lastname').sort({ dateUsed: -1 });
};

export const getAllUsages = async () => {
  return await MedicineUsage.find().populate('medicine usedBy patient');
};
