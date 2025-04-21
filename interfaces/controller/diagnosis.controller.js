import { createDiagnosisUseCases } from "../../application/use_cases/diagnosisUseCases.js";

import {
    diagnosisSchema,
    diagnosisUpdateSchema,
  } from "../../utils/validators.js";

//DIAGNOSIS
const {
    addDiagnosis,
    getDiagnosis,
    updateDiagnosis,
    removeDiagnosis,
    getPatientDiagnoses,
    getExaminationDiagnoses,
    getMedicalStaffDiagnoses,
  } = createDiagnosisUseCases();
  
  export const createDiagnosis = async (req, res) => {
    try {
      // Add the medical staff ID from authenticated user
      const diagnosisData = {
        ...req.body,
        medicalStaff: req.user.id,
      };
  
      // Validate input
      const validatedData = diagnosisSchema.parse(diagnosisData);
  
      const diagnosis = await addDiagnosis(validatedData);
  
      return res.status(201).json({
        success: true,
        message: "Оношийн мэдээлэл амжилттай бүртгэгдлээ!",
        data: diagnosis,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getDiagnosisById = async (req, res) => {
    try {
      const { id } = req.params;
      const diagnosis = await getDiagnosis(id);
  
      // Check if the user is authorized to view this diagnosis
      if (
        req.user.role === "Patient" &&
        diagnosis.patient._id.toString() !== req.user.id
      ) {
        return res.status(403).json({
          success: false,
          error: "Танд энэ оношийн мэдээллийг харах эрх байхгүй байна!",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: diagnosis,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const updateDiagnosisById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Add staff ID for verification that they own this diagnosis
      const updateData = {
        ...req.body,
        staffId: req.user.id,
      };
  
      // Validate update data
      const validatedData = diagnosisUpdateSchema.parse(updateData);
  
      const updatedDiagnosis = await updateDiagnosis(id, validatedData);
  
      return res.status(200).json({
        success: true,
        message: "Оношийн мэдээлэл амжилттай шинэчлэгдлээ!",
        data: updatedDiagnosis,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const deleteDiagnosisById = async (req, res) => {
    try {
      const { id } = req.params;
      const staffId = req.user.id;
  
      const result = await removeDiagnosis(id, staffId);
  
      return res.status(200).json(result);
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getPatientDiagnosisList = async (req, res) => {
    try {
      const { patientId } = req.params;
  
      // Check authorization if a patient is trying to access diagnoses
      if (req.user.role === "Patient" && patientId !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: "Танд бусад өвчтөний мэдээллийг харах эрх байхгүй байна!",
        });
      }
  
      const diagnoses = await getPatientDiagnoses(patientId);
  
      return res.status(200).json({
        success: true,
        count: diagnoses.length,
        data: diagnoses,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getMyDiagnoses = async (req, res) => {
    try {
      // Function works for both patients and medical staff
      const userId = req.user.id;
  
      if (req.user.role === "Patient") {
        // If user is a patient, get their diagnoses
        const diagnoses = await getPatientDiagnoses(userId);
        return res.status(200).json({
          success: true,
          count: diagnoses.length,
          data: diagnoses,
        });
      } else if (req.user.role === "MedicalStaff") {
        // If user is medical staff, get diagnoses they created
        const diagnoses = await getMedicalStaffDiagnoses(userId);
        return res.status(200).json({
          success: true,
          count: diagnoses.length,
          data: diagnoses,
        });
      } else {
        return res.status(403).json({
          success: false,
          error: "Энэ үйлдлийг гүйцэтгэх эрх байхгүй байна!",
        });
      }
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
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