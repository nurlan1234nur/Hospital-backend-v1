import express from 'express';
import {
  createTreatment,
  getAllTreatments,
  getTreatmentsByPatientId
} from '../controller/treatmentController.js'; // Эмчилгээний контроллерыг импортлох
import { authenticateJWT, authorizeRole } from '../middleware/auth.js'; // Аутентификаци, эрхийн middleware-ийг импортлох

const router = express.Router();

router.post('/', createTreatment); // Эмчилгээ бүртгэх
router.get('/', getAllTreatments); // Бүх эмчилгээг авах
router.get('/patient/:patientId', getTreatmentsByPatientId); // Өвчтөний эмчилгээ авах

export default router;
