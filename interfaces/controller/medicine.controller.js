import * as medicineCases from "../../application/use_cases/medicineCases.js";    

export const createMedicine = async (req, res) => {
  try {
    const newMedicine = await medicineCases.createMedicine(req.body);
    res.status(201).json(newMedicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllMedicine = async (req, res) => {
  try {
    const meds = await medicineCases.getAllMedicine();
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMedicineById = async (req, res) => {
  try {
    const med = await medicineCases.getMedicineById(req.params.id);
    if (!med) return res.status(404).json({ error: "Not found" });
    res.json(med);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const updated = await medicineCases.updateMedicine(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const deleted = await medicineCases.deleteMedicine(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
