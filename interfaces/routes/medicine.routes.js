import express from "express";
import {
  createMedicine,
  getAllMedicine,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} from "../../interfaces/controller/medicine.controller.js";

const router = express.Router();

router.post("/", createMedicine);
router.get("/", getAllMedicine);
router.get("/:id", getMedicineById);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export default router;
