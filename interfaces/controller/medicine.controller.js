import {
    createMedicineUseCases,
  } from "../../application/use_cases/medicineUseCases.js";
  import {
    medicineSchema,
    medicineUpdateSchema,
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
  
  // MEDICINE
  const {
    addMedicine,
    getMedicine,
    updateMedicine,
    removeMedicine,
    getAllMedicines,
    getMedicalStaffMedicines,
    searchMedicines,
    getMedicinesExpiringBetween,
    getMedicinesWithLowStock
  } = createMedicineUseCases();
  
  // Medicine Controllers
  export const createMedicine = async (req, res) => {
    try {
      // Add the medical staff ID from authenticated user
      const medicineData = {
        ...req.body,
        medicalStaff: req.user.id,
      };
  
      // Parse date if it's a string
      if (medicineData.expiryDate && typeof medicineData.expiryDate === "string") {
        medicineData.expiryDate = new Date(medicineData.expiryDate);
      }
  
      // Validate input
      const validatedData = medicineSchema.parse(medicineData);
  
      const medicine = await addMedicine(validatedData);
  
      return res.status(201).json({
        success: true,
        message: "Эмийн мэдээлэл амжилттай бүртгэгдлээ!",
        data: medicine,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getMedicineById = async (req, res) => {
    try {
      const { id } = req.params;
      const medicine = await getMedicine(id);
  
      return res.status(200).json({
        success: true,
        data: medicine,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const updateMedicineById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Add staff ID for verification that they own this medicine record
      const updateData = {
        ...req.body,
        staffId: req.user.id,
      };
  
      // Parse date if it's a string
      if (updateData.expiryDate && typeof updateData.expiryDate === "string") {
        updateData.expiryDate = new Date(updateData.expiryDate);
      }
  
      // Validate update data
      const validatedData = medicineUpdateSchema.parse(updateData);
  
      const updatedMedicine = await updateMedicine(id, validatedData);
  
      return res.status(200).json({
        success: true,
        message: "Эмийн мэдээлэл амжилттай шинэчлэгдлээ!",
        data: updatedMedicine,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const deleteMedicineById = async (req, res) => {
    try {
      const { id } = req.params;
      const staffId = req.user.id;
  
      const result = await removeMedicine(id, staffId);
  
      return res.status(200).json(result);
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getAllMedicinesList = async (req, res) => {
    try {
      const medicines = await getAllMedicines();
  
      return res.status(200).json({
        success: true,
        count: medicines.length,
        data: medicines,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getMyMedicines = async (req, res) => {
    try {
      const userId = req.user.id;
      const medicines = await getMedicalStaffMedicines(userId);
  
      return res.status(200).json({
        success: true,
        count: medicines.length,
        data: medicines,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const searchMedicinesByName = async (req, res) => {
    try {
      const { query } = req.query;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: "Хайлтын утга оруулна уу",
        });
      }
  
      const medicines = await searchMedicines(query);
  
      return res.status(200).json({
        success: true,
        count: medicines.length,
        data: medicines,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getExpiringMedicines = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "Эхлэх болон дуусах огноо оруулна уу",
        });
      }
  
      const medicines = await getMedicinesExpiringBetween(startDate, endDate);
  
      return res.status(200).json({
        success: true,
        count: medicines.length,
        data: medicines,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getLowStockMedicinesList = async (req, res) => {
    try {
      const { threshold } = req.query;
      const thresholdValue = threshold ? parseInt(threshold) : 10;
      
      const medicines = await getMedicinesWithLowStock(thresholdValue);
  
      return res.status(200).json({
        success: true,
        count: medicines.length,
        data: medicines,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };