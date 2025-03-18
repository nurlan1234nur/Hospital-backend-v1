import registerMedicalStaff from "../../application/use_cases/registerMedicalStaff.js";

export const registerStaff = async (req, res) => {
  try {
    const staff = await registerMedicalStaff(req.body);
    res.status(201).json({ message: "Мэдийн ажилтан бүртгэгдлээ!", staff });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};