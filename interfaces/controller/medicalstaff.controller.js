import { createMedicalStaffUseCases } from "../../application/use_cases/medicalStaffUsecases.js";
import { toPublicMedStaff } from "../../utils/formatter.js";

const MedicalStaffUseCases = createMedicalStaffUseCases();

class MedicalStaffController {
  async list(req, res) {
    const data = await MedicalStaffUseCases.listStaff();
    res.json(data.map(toPublicMedStaff));
  }

  async get(req, res) {
    const staff = await MedicalStaffUseCases.getStaff(req.params.id);
    res.json(toPublicMedStaff(staff));
  }

  async create(req, res) {
    const newStaff = await MedicalStaffUseCases.addStaff(req.body);
    res.status(201).json(toPublicMedStaff(newStaff));
  }

  async update(req, res) {
    const updated = await MedicalStaffUseCases.updateStaff(req.params.id, req.body);
    res.json(toPublicMedStaff(updated));
  }

  async delete(req, res) {
    const result = await MedicalStaffUseCases.removeStaff(req.params.id);
    res.json(result);
  }
}

export default new MedicalStaffController();
