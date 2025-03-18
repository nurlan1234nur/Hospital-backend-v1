import registerPatient from "../../application/use_cases/registerPatient.js";
import loginUser from "../../application/use_cases/loginUser.js";

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
