import bcrypt from "bcrypt";
import {
  createPatient,
  findUserByEmail,
} from "../../infrastructure/repositories/userRepository.js";

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

export default registerPatient;
