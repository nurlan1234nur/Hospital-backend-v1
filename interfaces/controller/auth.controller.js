import { createUserUseCases } from "../../application/use_cases/userUseCases.js";
const { registerPatient, registerAdmin, registerDoctor, registerNurse, login } =
  createUserUseCases();

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
    const { accessToken, refreshToken } = await login(req.body);
    res.status(200).json({ message: "Амжилттай нэвтэрлээ!", token, role });
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({ message: "Нэвтэрлээ!", accessToken });
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
export const signUpDoctor = async (req, res) => {
  try {
    const staff = await registerDoctor(req.body);
    res.status(201).json({ message: "Мэдийн ажилтан бүртгэгдлээ!", staff });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const signUpNurse = async (req, res) => {
  try {
    const staff = await registerNurse(req.body);
    res.status(201).json({ message: "Мэдийн ажилтан бүртгэгдлээ!", staff });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
