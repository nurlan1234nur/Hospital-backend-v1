import { findDiseaseCodeById, findDiseaseCodeByValue, listAllDiseaseCodes } from "../../infrastructure/repositories/diseasesRepository.js";
import { createError } from "../../utils/error.js";
export const createDiseaseCodeUseCases = () => {
    const listDiseaseCodes = async (filters = {}) => {
      const diseaseCodes = await listAllDiseaseCodes(filters);
      return diseaseCodes;
    };
  
    const getDiseaseCodeById = async (id) => {
      const diseaseCode = await findDiseaseCodeById(id);
      if (!diseaseCode) {
        throw createError("Өвчний код олдсонгүй!", 404);
      }
      return diseaseCode;
    };
  
    const getDiseaseCodeByValue = async (value) => {
      const diseaseCode = await findDiseaseCodeByValue(value);
      if (!diseaseCode) {
        throw createError("Өвчний код олдсонгүй!", 404);
      }
      return diseaseCode;
    };
  
    return {
      listDiseaseCodes,
      getDiseaseCodeById,
      getDiseaseCodeByValue,
    };
  };