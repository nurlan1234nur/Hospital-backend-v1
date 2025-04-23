import express from "express";
import {
  createStock,
  getStockById,
  updateStockById,
  deleteStockById,
  getAllStocksList,
  getStocksByMedicineId,
  getStocksByTreatmentId,
  getMyStocks
} from "../controller/stock.controller.js";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateJWT);

// Create a new stock record (medical staff only)
router.post(
  "/",
  authorizeRole(["MedicalStaff", "Admin"]),
  createStock
);

// Get stock by ID
router.get(
  "/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  getStockById
);

// Update stock (medical staff only)
router.put(
  "/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  updateStockById
);

// Delete stock (medical staff only)
router.delete(
  "/:id",
  authorizeRole(["MedicalStaff", "Admin"]),
  deleteStockById
);

// Get all stocks
router.get(
  "/list/all",
  authorizeRole(["MedicalStaff", "Admin"]),
  getAllStocksList
);

// Get all stocks by medicine ID
router.get(
  "/medicine/:medicineId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getStocksByMedicineId
);

// Get all stocks by treatment ID
router.get(
  "/treatment/:treatmentId",
  authorizeRole(["MedicalStaff", "Admin"]),
  getStocksByTreatmentId
);

// Get all stocks created by the logged-in medical staff
router.get(
  "/list/my",
  authorizeRole(["MedicalStaff"]),
  getMyStocks
);

export default router;