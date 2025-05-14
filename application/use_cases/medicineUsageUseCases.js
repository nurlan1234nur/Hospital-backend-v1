// application/use_cases/medicineUsageUseCases.js
import {
    createMedicineUsage,
    getUsageByMedicine,
    getAllUsages,
  } from '../../infrastructure/repositories/medicineUsageRepository.js';
  
  export const createMedicineUsageUseCases = () => {
    const useMedicine = async (usageData) => {
      return await createMedicineUsage(usageData);
    };
  
    const getMedicineUsages = async (medicineId) => {
      return await getUsageByMedicine(medicineId);
    };
  
    const getAllMedicineUsages = async () => {
      return await getAllUsages();
    };
  
    return {
      useMedicine,
      getMedicineUsages,
      getAllMedicineUsages,
    };
  };
  