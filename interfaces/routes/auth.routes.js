import * as authController from "../controller/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/signupDoctor", authController.signUpDoctor);
router.post("/signupNurse", authController.signUpNurse);
router.post("/signupAdmin", authController.signUpAdmin);

export default router;
