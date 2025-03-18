import bcrypt from "bcrypt";
import { createMedicalStaff, findUserByEmail } from "../../infrastructure/repositories/userRepository.js";

const registerMedicalStaff = async ({
  firstname,
  lastname,
  email,
  password,
  phoneNumber,
  position,
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
    password: hashedPassword,
    position,
    specialization,
    // Additional fields as needed
  });
};

export default registerMedicalStaff;