import bcrypt from "bcrypt";
import { createAdmin, findUserByEmail } from "../../infrastructure/repositories/userRepository.js";

const registerAdmin = async ({ firstname, lastname, email, password, phoneNumber }) => {
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

export default registerAdmin;
