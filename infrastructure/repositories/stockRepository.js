import Stock from "../../domain/models/Stock.model.js";

// Stock Repository
export const createStock = async (stockData) => {
  return await Stock.create(stockData);
};

export const findStockById = async (id) => {
  return await Stock.findById(id)
    .populate("medicine", "name dosage price expiryDate")
    .populate("treatment", "treatmentType date diagnosisType")
    .populate("medicalStaff", "firstname lastname position specialization");
};

export const updateStockById = async (id, updateData) => {
  return await Stock.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("medicine", "name dosage price expiryDate")
    .populate("treatment", "treatmentType date diagnosisType")
    .populate("medicalStaff", "firstname lastname position specialization");
};

export const deleteStockById = async (id) => {
  return await Stock.findByIdAndDelete(id);
};

export const listAllStocks = async () => {
  return await Stock.find()
    .populate("medicine", "name dosage price expiryDate")
    .populate("treatment", "treatmentType date diagnosisType")
    .populate("medicalStaff", "firstname lastname position specialization")
    .sort({ createdAt: -1 }); // Sort by creation date, most recent first
};

export const listStocksByMedicine = async (medicineId) => {
  return await Stock.find({ medicine: medicineId })
    .populate("medicine", "name dosage price expiryDate")
    .populate("treatment", "treatmentType date diagnosisType")
    .populate("medicalStaff", "firstname lastname position specialization")
    .sort({ createdAt: -1 });
};

export const listStocksByTreatment = async (treatmentId) => {
  return await Stock.find({ treatment: treatmentId })
    .populate("medicine", "name dosage price expiryDate")
    .populate("treatment", "treatmentType date diagnosisType")
    .populate("medicalStaff", "firstname lastname position specialization")
    .sort({ createdAt: -1 });
};

export const listStocksByMedicalStaff = async (staffId) => {
  return await Stock.find({ medicalStaff: staffId })
    .populate("medicine", "name dosage price expiryDate")
    .populate("treatment", "treatmentType date diagnosisType")
    .sort({ createdAt: -1 });
};