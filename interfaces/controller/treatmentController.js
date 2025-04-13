import Treatment from '../../domain/models/Treatment.model.js';
import { createTreatment as createTreatmentRepo } from '../../infrastructure/repositories/treatmentRepository.js';
import { findPatientById } from '../../infrastructure/repositories/patientRepository.js';
import { findTreatmentById } from '../../infrastructure/repositories/treatmentRepository.js';

// Эмчилгээ бүртгэх
export const createTreatment = async (req, res) => {
  try {
    const newTreatment = new Treatment(req.body);
    const savedTreatment = await newTreatment.save();
    res.status(201).json(savedTreatment);
  } catch (error) {
    res.status(400).json({ message: 'Бүртгэх үед алдаа гарлаа', error });
  }
};

// Бүх эмчилгээг авах
export const getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find()
      .populate('patient')
      .populate('medicalStaff');
    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ message: 'Унших үед алдаа гарлаа', error });
  }
};

// Тухайн өвчтөний бүх эмчилгээ авах
export const getTreatmentsByPatientId = async (req, res) => {
  const { patientId } = req.params;
  try {
    const treatments = await Treatment.find({ patient: patientId })
      .populate('patient')
      .populate('medicalStaff');
    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ message: 'Өвчтөний эмчилгээ авах үед алдаа гарлаа', error });
  }
};
