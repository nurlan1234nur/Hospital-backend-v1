import DiseaseCode from "../../domain/models/Diseasecode.model.js";

export const listAllDiseaseCodes = async (filters = {}) => {
    let query = {};
  
    // If search term is provided, search in description and value fields
    if (filters.search) {
      query = {
        $or: [
          { description: { $regex: filters.search, $options: "i" } },
          { value: { $regex: filters.search, $options: "i" } },
        ],
      };
    }
  
    return await DiseaseCode.find(query)
      .sort({ value: 1 }) // Sort by ICD-10 code
      .limit(filters.limit ? parseInt(filters.limit) : 0);
  };
  
  export const findDiseaseCodeById = async (id) => {
    return await DiseaseCode.findById(id);
  };
  
  export const findDiseaseCodeByValue = async (value) => {
    return await DiseaseCode.findOne({ value });
  };
  