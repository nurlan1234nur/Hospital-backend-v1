// interfaces/routes/medicineUsage.routes.js
import express from 'express';
import { logMedicineUsage, getUsagesByMedicine, getAllUsages } from '../controller/medicineUsage.controller.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateJWT);

router.post('/', authorizeRole(['MedicalStaff', 'Admin']), logMedicineUsage);
router.get('/all', authorizeRole(['MedicalStaff', 'Admin']), getAllUsages);
router.get('/by-medicine/:medicineId', authorizeRole(['MedicalStaff', 'Admin']), getUsagesByMedicine);

export default router;
