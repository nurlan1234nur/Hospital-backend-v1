import bcrypt from "bcrypt";
import { createDoctor, findUserByEmail } from "../../infrastructure/repositories/userRepository.js";

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
  return await createDoctor({
    firstname,
    lastname,
    email,
    phoneNumber,
    password: hashedPassword,
    specialization,
    
  });
};

export default registerDoctor;