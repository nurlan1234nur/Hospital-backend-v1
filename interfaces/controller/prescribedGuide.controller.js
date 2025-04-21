import {
    createPrescribedGuideUseCases,
  } from "../../application/use_cases/prescribedGuideUseCases.js";
  import {
  
    prescribedGuideSchema,
    prescribedGuideUpdateSchema,
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
    addPrescribedGuide,
    getPrescribedGuide,
    updatePrescribedGuide,
    removePrescribedGuide,
    getPrescriptionGuides,
    getPatientPrescribedGuides,
    getMedicalStaffPrescribedGuides,
  } = createPrescribedGuideUseCases();
  
  
  
  
  // PrescribedGuide Controllers
  export const createPrescribedGuide = async (req, res) => {
    try {
      // Add the medical staff ID from authenticated user
      const prescribedGuideData = {
        ...req.body,
        medicalStaff: req.user.id,
      };
  
      // Validate input
      const validatedData = prescribedGuideSchema.parse(prescribedGuideData);
  
      const prescribedGuide = await addPrescribedGuide(validatedData);
  
      return res.status(201).json({
        success: true,
        message: "Зөвлөмжийн мэдээлэл амжилттай бүртгэгдлээ!",
        data: prescribedGuide,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getPrescribedGuideById = async (req, res) => {
    try {
      const { id } = req.params;
      const prescribedGuide = await getPrescribedGuide(id);
  
      // Check if patient is requesting their own prescribed guide
      if (
        req.user.role === "Patient" &&
        prescribedGuide.patient._id.toString() !== req.user.id
      ) {
        return res.status(403).json({
          success: false,
          error:
            "Танд бусад өвчтөний зөвлөмжийн мэдээлэл харах эрх байхгүй байна!",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: prescribedGuide,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const updatePrescribedGuideById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Add staff ID for verification that they own this prescribed guide
      const updateData = {
        ...req.body,
        staffId: req.user.id,
      };
  
      // Validate update data
      const validatedData = prescribedGuideUpdateSchema.parse(updateData);
  
      const updatedPrescribedGuide = await updatePrescribedGuide(
        id,
        validatedData
      );
  
      return res.status(200).json({
        success: true,
        message: "Зөвлөмжийн мэдээлэл амжилттай шинэчлэгдлээ!",
        data: updatedPrescribedGuide,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const deletePrescribedGuideById = async (req, res) => {
    try {
      const { id } = req.params;
      const staffId = req.user.id;
  
      const result = await removePrescribedGuide(id, staffId);
  
      return res.status(200).json(result);
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getPrescriptionGuidesList = async (req, res) => {
    try {
      const { prescriptionId } = req.params;
      const prescribedGuides = await getPrescriptionGuides(prescriptionId);
  
      // If user is a patient, verify they own the prescription through at least one guide
      if (req.user.role === "Patient" && prescribedGuides.length > 0) {
        if (prescribedGuides[0].patient._id.toString() !== req.user.id) {
          return res.status(403).json({
            success: false,
            error:
              "Танд бусад өвчтөний зөвлөмжийн мэдээлэл харах эрх байхгүй байна!",
          });
        }
      }
  
      return res.status(200).json({
        success: true,
        count: prescribedGuides.length,
        data: prescribedGuides,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getPatientPrescribedGuidesList = async (req, res) => {
    try {
      const { patientId } = req.params;
  
      // Check if patient is requesting their own prescribed guides
      if (req.user.role === "Patient" && patientId !== req.user.id) {
        return res.status(403).json({
          success: false,
          error:
            "Танд бусад өвчтөний зөвлөмжийн мэдээлэл харах эрх байхгүй байна!",
        });
      }
  
      const prescribedGuides = await getPatientPrescribedGuides(patientId);
  
      return res.status(200).json({
        success: true,
        count: prescribedGuides.length,
        data: prescribedGuides,
      });
    } catch (error) {
      return handleZodOrAppError(res, error);
    }
  };
  
  export const getMyPrescribedGuides = async (req, res) => {
    try {
      const userId = req.user.id;
  
      if (req.user.role === "Patient") {
        // If user is a patient, get their prescribed guides
        const prescribedGuides = await getPatientPrescribedGuides(userId);
        return res.status(200).json({
          success: true,
          count: prescribedGuides.length,
          data: prescribedGuides,
        });
      } else if (req.user.role === "MedicalStaff") {
        // If user is medical staff, get prescribed guides they created
        const prescribedGuides = await getMedicalStaffPrescribedGuides(userId);
        return res.status(200).json({
          success: true,
          count: prescribedGuides.length,
          data: prescribedGuides,
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
  