import { createDiseaseCodeUseCases } from "../../application/use_cases/diseasesUseCases.js";

const { listDiseaseCodes, getDiseaseCodeById, getDiseaseCodeByValue } =
  createDiseaseCodeUseCases();

export const getDiseaseCodes = async (req, res) => {
  try {
    const filters = {
      search: req.query.search,
      limit: req.query.limit,
    };

    const diseaseCodes = await listDiseaseCodes(filters);

    return res.status(200).json({
      success: true,
      count: diseaseCodes.length,
      data: diseaseCodes,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getDiseaseCodeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const diseaseCode = await getDiseaseCodeById(id);

    return res.status(200).json({
      success: true,
      data: diseaseCode,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getDiseaseCodeByIcd10 = async (req, res) => {
  try {
    const { code } = req.params;
    const diseaseCode = await getDiseaseCodeByValue(code);

    return res.status(200).json({
      success: true,
      data: diseaseCode,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const importIcd10Codes = async (req, res) => {
  try {
    const codes = req.body;

    if (!Array.isArray(codes)) {
      return res.status(400).json({
        success: false,
        error: "Зөв форматтай өгөгдөл оруулна уу. JSON массив шаардлагатай.",
      });
    }

    const result = await importDiseaseCodes(codes);

    return res.status(201).json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

// Common Error Handler
const handleError = (res, error) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    error: message,
  });
};