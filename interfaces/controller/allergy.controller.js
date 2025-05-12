import { createAllergyUseCases } from "../../application/use_cases/allergyUseCases.js";
import { allergySchema, allergyUpdateSchema } from "../../utils/validators.js";

import { findAllergyById } from "../../infrastructure/repositories/allergyRepository.js";
import { createError } from "../../utils/error.js";

const {
  addAllergy,
  getAllergy,
  updateAllergy,
  removeAllergy,
  getPatientAllergies,
} = createAllergyUseCases();

//allergy
export const createAllergy = async (req, res) => {
  try {
    console.log("Incoming allergy POST data:", req.body);  // ✅ Step 1: see request body

    const validatedData = allergySchema.parse(req.body);   // ✅ Step 2: validate
    console.log("Validated allergy data:", validatedData);  // ✅ Step 3: confirm it's valid

    const allergy = await addAllergy(validatedData);        // ✅ Step 4: DB save
    console.log("Saved allergy:", allergy);                 // ✅ Step 5: DB result

    return res.status(201).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай бүртгэгдлээ!",
      data: allergy,
    });
  } catch (error) {
    console.error("Create allergy error:", error); // ✅ Step 6: show any failure
    return handleZodOrAppError(res, error);
  }
};


export const getAllergyById = async (req, res) => {
  try {
    const { id } = req.params;
    const allergy = await getAllergy(id);

    return res.status(200).json({
      success: true,
      data: allergy,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateAllergyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate update data
    const validatedData = allergyUpdateSchema.parse(req.body);

    const updatedAllergy = await updateAllergy(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedAllergy,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteAllergyById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await removeAllergy(id);

    return res.status(200).json(result);
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const getPatientAllergyList = async (req, res) => {
  try {
    const { patientId } = req.params;
    const allergies = await getPatientAllergies(patientId);

    return res.status(200).json({
      success: true,
      count: allergies.length,
      data: allergies,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};
export const getMyAllergies = async (req, res) => {
  try {
    const patientId = req.user.id; // Get patient ID from the authenticated user
    const allergies = await getPatientAllergies(patientId);

    return res.status(200).json({
      success: true,
      count: allergies.length,
      data: allergies,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const createMyAllergy = async (req, res) => {
  try {
    const patientId = req.user.id; // Get patient ID from the authenticated user

    // Add patient ID to the request body
    const allergyData = {
      ...req.body,
      patient: patientId,
    };

    // Validate input
    const validatedData = allergySchema.parse(allergyData);

    const allergy = await addAllergy(validatedData);

    return res.status(201).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай бүртгэгдлээ!",
      data: allergy,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const updateMyAllergyById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user.id; // Get patient ID from the authenticated user

    // Check if the allergy belongs to the patient
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }

    // Verify ownership
    if (allergy.patient.toString() !== patientId) {
      throw createError("Энэ харшлын мэдээлэлд хандах эрхгүй байна!", 403);
    }

    // Validate update data
    const validatedData = allergyUpdateSchema.parse(req.body);

    const updatedAllergy = await updateAllergy(id, validatedData);

    return res.status(200).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай шинэчлэгдлээ!",
      data: updatedAllergy,
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};

export const deleteMyAllergyById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientId = req.user.id; // Get patient ID from the authenticated user

    // Check if the allergy belongs to the patient
    const allergy = await findAllergyById(id);
    if (!allergy) {
      throw createError("Харшлын мэдээлэл олдсонгүй!", 404);
    }

    // Verify ownership
    if (allergy.patient.toString() !== patientId) {
      throw createError("Энэ харшлын мэдээлэлд хандах эрхгүй байна!", 403);
    }

    await removeAllergy(id);

    return res.status(200).json({
      success: true,
      message: "Харшлын мэдээлэл амжилттай устгагдлаа!",
    });
  } catch (error) {
    return handleZodOrAppError(res, error);
  }
};
// Common Error Handler
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
