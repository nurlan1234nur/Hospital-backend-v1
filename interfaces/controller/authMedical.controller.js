import MedicalStaff from "../../models/MedicalStaff.model.js";

const registerUser = require("../../application/use_cases/registerUser");
const loginUser = require("../../application/use_cases/loginUser");

export const registerMedicalStaff = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
    position,
    specialization,
  } = req.body;

  if (!firstname || !lastname || !email || !password || !position) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields." });
  }

  try {
    const existingStaff = await MedicalStaff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // hashed oruulaarai, maybe use bcrypt

    const newMedicalStaff = new MedicalStaff({
      firstname,
      lastname,
      email,
      password: password,
      phoneNumber,
      position,
      specialization,
    });

    await newMedicalStaff.save();

    res.status(201).json({ message: "Medical staff registered successfully." });
  } catch (error) {
    console.error("Error during medical staff registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
