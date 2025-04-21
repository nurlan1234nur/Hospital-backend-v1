import {
    createPrescribedMedUseCases,
  } from "../../application/use_cases/precribedMedUseCases.js";
  import {
    prescribedMedSchema,
    prescribedMedUpdateSchema,
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
  const {
    addPrescribedMed,
    getPrescribedMed,
    updatePrescribedMed,
    removePrescribedMed,
    getPrescriptionMeds,
    getPatientPrescribedMeds,
    getMedicalStaffPrescribedMeds,
  } = createPrescribedMedUseCases();

  
  // PrescribedMed Controllers
  export const createPrescribedMed = async (req, res) => {
    try {
      // Add the medical staff ID from authenticated user
      const prescribedMedData = {
        ...req.body,
        medicalStaff: req.user.id,
      };
  
      // Validate input
      const validatedData = prescribedMedSchema.parse(prescribedMedData);
  
      const prescribedMed = await addPrescribedMed(validatedData);
  
      return res.status(201).json({
        success: true,
        message: "Эмийн жорын мэдээлэл амжилттай бүртгэгдлээ!",
        data: prescribedMed,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getPrescribedMedById = async (req, res) => {
    try {
      const { id } = req.params;
      const prescribedMed = await getPrescribedMed(id);
  
      // Check if patient is requesting their own prescribed medication
      if (
        req.user.role === "Patient" &&
        prescribedMed.patient._id.toString() !== req.user.id
      ) {
        return res.status(403).json({
          success: false,
          error:
            "Танд бусад өвчтөний эмийн жорын мэдээлэл харах эрх байхгүй байна!",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: prescribedMed,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const updatePrescribedMedById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Add staff ID for verification that they own this prescribed med
      const updateData = {
        ...req.body,
        staffId: req.user.id,
      };
  
      // Validate update data
      const validatedData = prescribedMedUpdateSchema.parse(updateData);
  
      const updatedPrescribedMed = await updatePrescribedMed(id, validatedData);
  
      return res.status(200).json({
        success: true,
        message: "Эмийн жорын мэдээлэл амжилттай шинэчлэгдлээ!",
        data: updatedPrescribedMed,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const deletePrescribedMedById = async (req, res) => {
    try {
      const { id } = req.params;
      const staffId = req.user.id;
  
      const result = await removePrescribedMed(id, staffId);
  
      return res.status(200).json(result);
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getPrescriptionMedsList = async (req, res) => {
    try {
      const { prescriptionId } = req.params;
      const prescribedMeds = await getPrescriptionMeds(prescriptionId);
  
      // If user is a patient, verify they own the prescription through at least one med
      if (req.user.role === "Patient" && prescribedMeds.length > 0) {
        if (prescribedMeds[0].patient._id.toString() !== req.user.id) {
          return res.status(403).json({
            success: false,
            error:
              "Танд бусад өвчтөний эмийн жорын мэдээлэл харах эрх байхгүй байна!",
          });
        }
      }
  
      return res.status(200).json({
        success: true,
        count: prescribedMeds.length,
        data: prescribedMeds,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getPatientPrescribedMedsList = async (req, res) => {
    try {
      const { patientId } = req.params;
  
      // Check if patient is requesting their own prescribed meds
      if (req.user.role === "Patient" && patientId !== req.user.id) {
        return res.status(403).json({
          success: false,
          error:
            "Танд бусад өвчтөний эмийн жорын мэдээлэл харах эрх байхгүй байна!",
        });
      }
  
      const prescribedMeds = await getPatientPrescribedMeds(patientId);
  
      return res.status(200).json({
        success: true,
        count: prescribedMeds.length,
        data: prescribedMeds,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getMyPrescribedMeds = async (req, res) => {
    try {
      const userId = req.user.id;
  
      if (req.user.role === "Patient") {
        // If user is a patient, get their prescribed meds
        const prescribedMeds = await getPatientPrescribedMeds(userId);
        return res.status(200).json({
          success: true,
          count: prescribedMeds.length,
          data: prescribedMeds,
        });
      } else if (req.user.role === "MedicalStaff") {
        // If user is medical staff, get prescribed meds they created
        const prescribedMeds = await getMedicalStaffPrescribedMeds(userId);
        return res.status(200).json({
          success: true,
          count: prescribedMeds.length,
          data: prescribedMeds,
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