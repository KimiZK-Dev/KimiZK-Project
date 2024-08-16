import express from "express";
import authController from "../apps/controllers/A/AuthController.js";

const router = express.Router();

router.get("/signin", authController.signin);
router.get("/signup", authController.signup);

router.post("/auth/signin", authController.signinScript);
router.post("/auth/signup", authController.signupScript);

export default router;
