import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../../infrastructure/repositories/userRepository.js";

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};

export default loginUser;
