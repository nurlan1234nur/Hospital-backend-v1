import bcrypt from "bcrypt";
import {
  findUserByEmail,
  createAdmin,
  createMedicalStaff,
  createPatient,
} from "../../infrastructure/repositories/userRepository.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

export const createUserUseCases = () => {
  const registerAdmin = async ({
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
  }) => {
    // Check if email is already registered
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("Имэйл бүртгэгдсэн байна!");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    return await createAdmin({
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
    });
  };

  const login = async ({ email, password }) => {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }
    const payload = { id: user._id };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return { accessToken, refreshToken };
  };

  const registerDoctor = async ({
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
    specialization,
  }) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("Имэйл бүртгэгдсэн байна!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await createMedicalStaff({
      firstname,
      lastname,
      email,
      phoneNumber,
      position: "Doctor",
      password: hashedPassword,
      specialization,
    });
  };

  const registerNurse = async ({
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
    specialization,
  }) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("Имэйл бүртгэгдсэн байна!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await createMedicalStaff({
      firstname,
      lastname,
      email,
      phoneNumber,
      position: "Nurse",
      password: hashedPassword,
      specialization,
    });
  };

  const registerPatient = async ({
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
    type,
    register,
    address,
    sisiID,
    occupation,
    education,
    school,
    birthOfDate,
    gender,
  }) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("Имэйл бүртгэгдсэн байна!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await createPatient({
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
      type,
      register,
      address,
      sisiID,
      occupation,
      education,
      school,
      birthOfDate,
      gender,
    });
  };

  return {
    registerAdmin,
    registerDoctor,
    registerNurse,
    registerPatient,
    login,
  };
};
