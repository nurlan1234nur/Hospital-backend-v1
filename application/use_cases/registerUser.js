import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
} from "../../infrastructure/repositories/userRepository.js";

const registerUser = async ({
  firstname,
  lastname,
  email,
  password,
  phoneNumber,
}) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Имэйл бүртгэгдсэн байна!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser({
    firstname,
    lastname,
    email,
    phoneNumber,
    password: hashedPassword,
  });
};

export default registerUser;
