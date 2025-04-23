import {
    createStock,
    findStockById,
    updateStockById,
    deleteStockById,
    listAllStocks,
    listStocksByMedicine,
    listStocksByTreatment,
    listStocksByMedicalStaff
  } from "../../infrastructure/repositories/stockRepository.js";
  import { createError } from "../../utils/error.js";
  
  // STOCK
  export const createStockUseCases = () => {
    const addStock = async (stockData) => {
      const stock = await createStock(stockData);
      return stock;
    };
  
    const getStock = async (id) => {
      const stock = await findStockById(id);
      if (!stock) {
        throw createError("Нөөцийн мэдээлэл олдсонгүй!", 404);
      }
      return stock;
    };
  
    const updateStock = async (id, updateData) => {
      const stock = await findStockById(id);
      if (!stock) {
        throw createError("Нөөцийн мэдээлэл олдсонгүй!", 404);
      }
  
      // Check if staff can update this stock
      if (
        updateData.staffId &&
        stock.medicalStaff._id.toString() !== updateData.staffId
      ) {
        throw createError("Зөвхөн өөрийн бүртгэсэн нөөцийн мэдээллийг засах боломжтой!", 403);
      }
  
      // Remove staffId from update data as it's not a field in the model
      if (updateData.staffId) {
        delete updateData.staffId;
      }
  
      const updatedStock = await updateStockById(id, updateData);
      return updatedStock;
    };
  
    const removeStock = async (id, staffId) => {
      const stock = await findStockById(id);
      if (!stock) {
        throw createError("Нөөцийн мэдээлэл олдсонгүй!", 404);
      }
  
      // Ensure staff can only delete their own stock records
      if (stock.medicalStaff._id.toString() !== staffId) {
        throw createError("Зөвхөн өөрийн бүртгэсэн нөөцийн мэдээллийг устгах боломжтой!", 403);
      }
  
      await deleteStockById(id);
      return { success: true, message: "Нөөцийн мэдээлэл амжилттай устгагдлаа!" };
    };
  
    const getAllStocks = async () => {
      const stocks = await listAllStocks();
      return stocks;
    };
  
    const getStocksByMedicine = async (medicineId) => {
      const stocks = await listStocksByMedicine(medicineId);
      return stocks;
    };
  
    const getStocksByTreatment = async (treatmentId) => {
      const stocks = await listStocksByTreatment(treatmentId);
      return stocks;
    };
  
    const getMedicalStaffStocks = async (staffId) => {
      const stocks = await listStocksByMedicalStaff(staffId);
      return stocks;
    };
  
    return {
      addStock,
      getStock,
      updateStock,
      removeStock,
      getAllStocks,
      getStocksByMedicine,
      getStocksByTreatment,
      getMedicalStaffStocks
    };
  };