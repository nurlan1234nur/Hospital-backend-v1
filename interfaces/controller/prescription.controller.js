import {
    createPrescriptionUseCases,
  } from "../../application/use_cases/prescriptionUseCases.js";
  import {
    prescriptionSchema,
    prescriptionUpdateSchema,
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
  //PRESCRIPTION
const {
    addPrescription,
    getPrescription,
    updatePrescription,
    removePrescription,
    getPatientPrescriptions,
    getMedicalStaffPrescriptions,
  } = createPrescriptionUseCases();
  

  
  // Prescription Controllers
  export const createPrescription = async (req, res) => {
    try {
      // Add the medical staff ID from authenticated user
      const prescriptionData = {
        ...req.body,
        prescribedBy: req.user.id,
      };
  
      // Parse date if it's a string
      if (prescriptionData.date && typeof prescriptionData.date === "string") {
        prescriptionData.date = new Date(prescriptionData.date);
      }
  
      // Validate input
      const validatedData = prescriptionSchema.parse(prescriptionData);
  
      const prescription = await addPrescription(validatedData);
  
      return res.status(201).json({
        success: true,
        message: "Жорын мэдээлэл амжилттай бүртгэгдлээ!",
        data: prescription,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getPrescriptionById = async (req, res) => {
    try {
      const { id } = req.params;
      const prescription = await getPrescription(id);
  
      // Check if patient is requesting their own prescription
      if (
        req.user.role === "Patient" &&
        prescription.patient._id.toString() !== req.user.id
      ) {
        return res.status(403).json({
          success: false,
          error: "Танд бусад өвчтөний жорын мэдээлэл харах эрх байхгүй байна!",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: prescription,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const updatePrescriptionById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Add staff ID for verification that they own this prescription
      const updateData = {
        ...req.body,
        staffId: req.user.id,
      };
  
      // Parse date if it's a string
      if (updateData.date && typeof updateData.date === "string") {
        updateData.date = new Date(updateData.date);
      }
  
      // Validate update data
      const validatedData = prescriptionUpdateSchema.parse(updateData);
  
      const updatedPrescription = await updatePrescription(id, validatedData);
  
      return res.status(200).json({
        success: true,
        message: "Жорын мэдээлэл амжилттай шинэчлэгдлээ!",
        data: updatedPrescription,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const deletePrescriptionById = async (req, res) => {
    try {
      const { id } = req.params;
      const staffId = req.user.id;
  
      const result = await removePrescription(id, staffId);
  
      return res.status(200).json(result);
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getPatientPrescriptionList = async (req, res) => {
    try {
      const { patientId } = req.params;
  
      // Check if patient is requesting their own prescriptions
      if (req.user.role === "Patient" && patientId !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: "Танд бусад өвчтөний жорын мэдээлэл харах эрх байхгүй байна!",
        });
      }
  
      const prescriptions = await getPatientPrescriptions(patientId);
  
      return res.status(200).json({
        success: true,
        count: prescriptions.length,
        data: prescriptions,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getMyPrescriptions = async (req, res) => {
    try {
      const userId = req.user.id;
  
      if (req.user.role === "Patient") {
        // If user is a patient, get their prescriptions
        const prescriptions = await getPatientPrescriptions(userId);
        return res.status(200).json({
          success: true,
          count: prescriptions.length,
          data: prescriptions,
        });
      } else if (req.user.role === "MedicalStaff") {
        // If user is medical staff, get prescriptions they created
        const prescriptions = await getMedicalStaffPrescriptions(userId);
        return res.status(200).json({
          success: true,
          count: prescriptions.length,
          data: prescriptions,
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