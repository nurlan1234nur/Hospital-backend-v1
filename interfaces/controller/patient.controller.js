import { createPatientUseCases } from "../../application/use_cases/patientUseCases.js";
import { modifiedPatient } from "../../utils/formatter.js";

const { listPatients } = createPatientUseCases();

export const listAllPatients = async (req, res) => {
  try {
    const patients = await listPatients();
    const safePatients = patients.map(modifiedPatient);
    res.status(200).json({
      message: "Read successfully!",
      count: safePatients.length,
      patients: safePatients,
    });
  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    res.status(status).json({ error: message });
  }
};
