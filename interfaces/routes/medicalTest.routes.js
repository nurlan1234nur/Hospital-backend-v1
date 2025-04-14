import express from "express";
import {
  createMedicalTest,
  getAllMedicalTests,
  getMedicalTestById,
  updateMedicalTest,
  deleteMedicalTest,
} from "../../interfaces/controller/medicalTest.controller.js";


const router = express.Router();

router.post("/", createMedicalTest);
router.get("/", getAllMedicalTests);
router.get("/:id", getMedicalTestById);
router.put("/:id", updateMedicalTest);
router.delete("/:id", deleteMedicalTest);

export default router;
