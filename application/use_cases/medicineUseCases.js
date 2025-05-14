import {
  createMedicine,
  findMedicineById,
  updateMedicineById,
  deleteMedicineById,
  listAllMedicines,
  listMedicinesByMedicalStaff,
  searchMedicinesByName,
  getMedicinesByExpiryDate,
  getLowStockMedicines
} from "../../infrastructure/repositories/medicineRepository.js";
import { createError } from "../../utils/error.js";

// MEDICINE
export const createMedicineUseCases = () => {
  const addMedicine = async (medicineData) => {
    const medicine = await createMedicine({
      ...medicineData,
      expiryDate: medicineData.expiryDate || null,
    });

    return medicine;
  };

  const getMedicine = async (id) => {
    const medicine = await findMedicineById(id);
    if (!medicine) {
      throw createError("Эмийн мэдээлэл олдсонгүй!", 404);
    }
    return medicine;
  };

  const updateMedicine = async (id, updateData) => {
    const medicine = await findMedicineById(id);
    if (!medicine) {
      throw createError("Эмийн мэдээлэл олдсонгүй!", 404);
    }

    // REMOVE THIS CHECK TO ALLOW ANY ADMIN/MEDICALSTAFF TO UPDATE ANY MEDICINE
    // The role-based authorization is already handled in the routes layer
    
    // Original restrictive check (commented out):
    /*
    if (
      updateData.staffId &&
      medicine.medicalStaff &&
      medicine.medicalStaff._id.toString() !== updateData.staffId
    ) {
      throw createError("Зөвхөн өөрийн бүртгэсэн эмийн мэдээллийг засах боломжтой!", 403);
    }
    */

    // Remove staffId from update data as it's not a field in the model
    if (updateData.staffId) {
      delete updateData.staffId;
    }

    const updatedMedicine = await updateMedicineById(id, updateData);
    return updatedMedicine;
  };

  const removeMedicine = async (id, staffId) => {
    const medicine = await findMedicineById(id);
    if (!medicine) {
      throw createError("Эмийн мэдээлэл олдсонгүй!", 404);
    }

    // REMOVE THIS CHECK TO ALLOW ANY ADMIN/MEDICALSTAFF TO DELETE ANY MEDICINE
    // The role-based authorization is already handled in the routes layer
    
    // Original restrictive check (commented out):
    /*
    if (medicine.medicalStaff && medicine.medicalStaff._id.toString() !== staffId) {
      throw createError("Зөвхөн өөрийн бүртгэсэн эмийн мэдээллийг устгах боломжтий!", 403);
    }
    */

    await deleteMedicineById(id);
    return { success: true, message: "Эмийн мэдээлэл амжилттай устгагдлаа!" };
  };

  const getAllMedicines = async () => {
    const medicines = await listAllMedicines();
    return medicines;
  };

  const getMedicalStaffMedicines = async (staffId) => {
    const medicines = await listMedicinesByMedicalStaff(staffId);
    return medicines;
  };

  const searchMedicines = async (searchTerm) => {
    const medicines = await searchMedicinesByName(searchTerm);
    return medicines;
  };

  const getMedicinesExpiringBetween = async (startDate, endDate) => {
    const medicines = await getMedicinesByExpiryDate(startDate, endDate);
    return medicines;
  };

  const getMedicinesWithLowStock = async (threshold) => {
    const medicines = await getLowStockMedicines(threshold);
    return medicines;
  };

  return {
    addMedicine,
    getMedicine,
    updateMedicine,
    removeMedicine,
    getAllMedicines,
    getMedicalStaffMedicines,
    searchMedicines,
    getMedicinesExpiringBetween,
    getMedicinesWithLowStock
  };
};