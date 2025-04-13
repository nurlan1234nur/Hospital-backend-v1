import * as medicalTestCases from "../../application/use_cases/medicalTestCases.js";

export const createMedicalTest = async (req, res) => {
  try {
    const newTest = await medicalTestCases.createMedicalTest(req.body);
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllMedicalTests = async (req, res) => {
  try {
    const tests = await medicalTestCases.getAllMedicalTests();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMedicalTestById = async (req, res) => {
  try {
    const test = await medicalTestCases.getMedicalTestById(req.params.id);
    if (!test) return res.status(404).json({ error: "Not found" });
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMedicalTest = async (req, res) => {
  try {
    const updated = await medicalTestCases.updateMedicalTest(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteMedicalTest = async (req, res) => {
  try {
    const deleted = await medicalTestCases.deleteMedicalTest(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export default {
export default {
  createMedicalTest,
  getAllMedicalTests,
  getMedicalTestById,
  updateMedicalTest,
  deleteMedicalTest,
};