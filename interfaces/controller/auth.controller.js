import registerPatient from "../../application/use_cases/registerPatient.js";
import loginUser from "../../application/use_cases/loginUser.js";
import registerAdmin from "../../application/use_cases/registerAdmin.js";
import registerMedicalStaff from "../../application/use_cases/registerMedicalStaff.js";

export const signUp = async (req, res) => {
  try {
    const user = await registerPatient(req.body);
    res.status(201).json({ message: "Хэрэглэгч бүртгэгдлээ!", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { token } = await loginUser(req.body);
    res.status(200).json({ message: "Амжилттай нэвтэрлээ!", token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
export const signUpAdmin = async (req, res) => {
  try {
    const admin = await registerAdmin(req.body);
    res.status(201).json({ message: "Админ бүртгэгдлээ!", admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const registerStaff = async (req, res) => {
  try {
    const staff = await registerMedicalStaff(req.body);
    res.status(201).json({ message: "Мэдийн ажилтан бүртгэгдлээ!", staff });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

