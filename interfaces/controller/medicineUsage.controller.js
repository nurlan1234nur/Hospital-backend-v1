// interfaces/controller/medicineUsage.controller.js
import { createMedicineUsageUseCases } from '../../application/use_cases/medicineUsageUseCases.js';

const { useMedicine, getMedicineUsages, getAllMedicineUsages } = createMedicineUsageUseCases();

export const logMedicineUsage = async (req, res) => {
  try {
    const data = {
      ...req.body,
      usedBy: req.user.id,
    };

    const usage = await useMedicine(data);

    res.status(201).json({ success: true, data: usage });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getUsagesByMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const usages = await getMedicineUsages(medicineId);
    res.status(200).json({ success: true, data: usages });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getAllUsages = async (_req, res) => {
  try {
    const usages = await getAllMedicineUsages();
    res.status(200).json({ success: true, data: usages });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
