const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../../infrastructure/repositories/userRepository");

const loginUser = async ({ email, password }) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Имэйл эсвэл нууц үг буруу байна!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Имэйл эсвэл нууц үг буруу байна!");
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token };
};

module.exports = loginUser;
