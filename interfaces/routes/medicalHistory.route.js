import express from 'express';
import MedicalHistory from '../../domain/models/MedicalHistory.model.js'; // MedicalHistory model-ийг импортлох

const router = express.Router();

// Өвчтөний ID-гаар MedicalHistory авах
router.get('/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;  // Өвчтөний ID-ийг URL-ийн параметрээр авах
    const medicalHistories = await MedicalHistory.find({ patient: patientId });

    if (medicalHistories.length === 0) {
      return res.status(404).json({ message: "Өвчний түүх олдсонгүй" });
    }

    res.json(medicalHistories); // Өвчний түүхүүдийг буцаах
  } catch (err) {
    console.error("Error fetching medical histories by patient ID:", err);
    res.status(500).json({
      message: "Өвчний түүхийг авахад алдаа гарлаа",
      error: err.message || err
    });
  }
});

// Өвчний түүх бүртгэх
router.post('/', async (req, res) => {
  try {
    const medicalHistory = new MedicalHistory(req.body);
    await medicalHistory.save();
    res.status(201).json(medicalHistory); // Амжилттай бүртгэгдсэн тохиолдолд
  } catch (err) {
    res.status(500).json({
      message: "Өвчний түүхийг бүртгэхэд алдаа гарлаа",
      error: err.message || err
    });
  }
});

export default router;
