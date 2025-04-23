import {
    createStockUseCases,
  } from "../../application/use_cases/stockUseCases.js";
  import {
    stockSchema,
    stockUpdateSchema,
  } from "../../utils/validators.js";
  
  const handleZodOrAppError = (res, error, fallbackStatus = 400) => {
    if (error.name === "ZodError") {
      const errors = error.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      }));
      return res.status(400).json({ errors });
    }
    const status = error.statusCode || fallbackStatus;
    const message = error.message || "Something went wrong";
    return res.status(status).json({ error: message });
  };
  
  // STOCK
  const {
    addStock,
    getStock,
    updateStock,
    removeStock,
    getAllStocks,
    getStocksByMedicine,
    getStocksByTreatment,
    getMedicalStaffStocks
  } = createStockUseCases();
  
  // Stock Controllers
  export const createStock = async (req, res) => {
    try {
      // Add the medical staff ID from authenticated user
      const stockData = {
        ...req.body,
        medicalStaff: req.user.id,
      };
  
      // Validate input
      const validatedData = stockSchema.parse(stockData);
  
      const stock = await addStock(validatedData);
  
      return res.status(201).json({
        success: true,
        message: "Нөөцийн мэдээлэл амжилттай бүртгэгдлээ!",
        data: stock,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getStockById = async (req, res) => {
    try {
      const { id } = req.params;
      const stock = await getStock(id);
  
      return res.status(200).json({
        success: true,
        data: stock,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const updateStockById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Add staff ID for verification that they own this stock record
      const updateData = {
        ...req.body,
        staffId: req.user.id,
      };
  
      // Validate update data
      const validatedData = stockUpdateSchema.parse(updateData);
  
      const updatedStock = await updateStock(id, validatedData);
  
      return res.status(200).json({
        success: true,
        message: "Нөөцийн мэдээлэл амжилттай шинэчлэгдлээ!",
        data: updatedStock,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const deleteStockById = async (req, res) => {
    try {
      const { id } = req.params;
      const staffId = req.user.id;
  
      const result = await removeStock(id, staffId);
  
      return res.status(200).json(result);
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getAllStocksList = async (req, res) => {
    try {
      const stocks = await getAllStocks();
  
      return res.status(200).json({
        success: true,
        count: stocks.length,
        data: stocks,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getStocksByMedicineId = async (req, res) => {
    try {
      const { medicineId } = req.params;
      const stocks = await getStocksByMedicine(medicineId);
  
      return res.status(200).json({
        success: true,
        count: stocks.length,
        data: stocks,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getStocksByTreatmentId = async (req, res) => {
    try {
      const { treatmentId } = req.params;
      const stocks = await getStocksByTreatment(treatmentId);
  
      return res.status(200).json({
        success: true,
        count: stocks.length,
        data: stocks,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getMyStocks = async (req, res) => {
    try {
      const userId = req.user.id;
      const stocks = await getMedicalStaffStocks(userId);
  
      return res.status(200).json({
        success: true,
        count: stocks.length,
        data: stocks,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };