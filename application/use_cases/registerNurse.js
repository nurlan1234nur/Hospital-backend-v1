import bcrypt from "bcrypt";
import { createNurse, findUserByEmail } from "../../infrastructure/repositories/userRepository.js";

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
  return await createNurse({
    firstname,
    lastname,
    email,
    phoneNumber,
    password: hashedPassword,
    specialization,
    
  });
};

export default registerNurse;