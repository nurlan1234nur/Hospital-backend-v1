import express from "express";

import {
  createVitalSigns,
  getVitalSignsById,
  updateVitalSignsById,
  deleteVitalSignsById,
  getPatientVitalSignsList,
  getPatientLatestVitalSigns,
  getPatientVitalSignsByDateRange,
  getMyVitalSignsByStaff,
  getMyVitalSigns,
  getMyLatestVitalSigns,
  createVitalSignsFromIoT
} from "../controller/vitals.controller.js";
import { authenticateJWT, authorizeRole } from "../middleware/auth.js";
import VitalSigns from "../../domain/models/Vital.model.js";

const router = express.Router();
router.use(authenticateJWT);

router.post("/vitalsigns", authorizeRole(["MedicalStaff"]), createVitalSigns);

router.get(
  '/vitalsigns/latest',
  authorizeRole(['Patient', 'MedicalStaff', 'Admin']),
  async (req, res) => {
    try {
      const latestVital = await VitalSigns.findOne({ medicalStaff: req.user.id })
        .sort({ createdAt: -1 })
        .limit(1);

      if (!latestVital) return res.status(404).json({ message: 'No vital signs found' });

      res.status(200).json(latestVital);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch latest vital signs', error: err.message });
    }
  }
);

router.get(
  "/vitalsigns/:id",
  authorizeRole(["MedicalStaff"]),
  getVitalSignsById
);

router.put(
  "/vitalsigns/:id",
  authorizeRole(["MedicalStaff"]),
  updateVitalSignsById
);

router.delete(
  "/vitalsigns/:id",
  authorizeRole(["MedicalStaff"]),
  deleteVitalSignsById
);

router.get(
  "/patient/:patientId/vitalsigns",
  authorizeRole(["MedicalStaff"]),
  getPatientVitalSignsList
);

router.get(
  "/patient/:patientId/vitalsigns/latest",
  authorizeRole(["MedicalStaff"]),
  getPatientLatestVitalSigns
);

router.get(
  "/patient/:patientId/vitalsigns/daterange",
  authorizeRole(["MedicalStaff"]),
  getPatientVitalSignsByDateRange
);

router.get(
  "/vitalsigns/my/recorded",
  authorizeRole(["MedicalStaff"]),
  getMyVitalSignsByStaff
);

router.get(
  "/vitalsigns/my/latest",
  authorizeRole(["Patient"]),
  getMyLatestVitalSigns
);

//VITAL SIGNS
router.get("/vitalsigns/:id", authorizeRole(["Patient"]), getVitalSignsById);

router.get(
  "/vitalsigns/my/recorded",
  authorizeRole(["Patient"]),
  getMyVitalSigns
);

router.get(
  "/vitalsigns/my/daterange",
  authorizeRole(["Patient"]),
  (req, res, next) => {
    req.params.patientId = req.user.id;
    next();
  },
  getPatientVitalSignsByDateRange
);

router.post(
  "/vitalsigns/receive",
  authorizeRole(["MedicalStaff", "Admin"]),
  async (req, res) => {
    try {
      // Assuming req.body contains the vital signs data from iOS app
      const { diastolic, pulseRate, systolic, timeStamp } = req.body;
      
      let bloodPressure_ = diastolic+"/"+systolic;

      // Validate the data
      if (!diastolic || !pulseRate) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const vitalSignsData = {
        concsiousness_status:null,
        heart_rate:pulseRate,
        blood_pressure:bloodPressure_,
        temperature:null,
        respiration_rate:null,
        oxygen_saturation:null,
        height:null,
        weight:null,
        respiratoryRate:null,
        patient:null,
        createdAt: timeStamp,
        updatedAt: timeStamp
      };

      const newVitalSign = await createVitalSignsFromIoT(vitalSignsData, req, res);

      // Send a success response
      res.status(201).json({ message: "Vital signs received successfully", data: newVitalSign });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to save vital signs data", error: err.message });
    }
  }
);

export default router;