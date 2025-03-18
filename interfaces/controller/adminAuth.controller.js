import registerAdmin from "../../application/use_cases/registerAdmin.js";

export const signUpAdmin = async (req, res) => {
  try {
    const admin = await registerAdmin(req.body);
    res.status(201).json({ message: "Админ бүртгэгдлээ!", admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
