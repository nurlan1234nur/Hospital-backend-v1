import express from "express";

import { authenticateJWT, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

//middleware
router.use(authenticateJWT);




export default router;
