import express from "express";
import authController from "../apps/controllers/AuthController.js";

const router = express.Router();

router.get("/login", authController.login);
router.get("/signup", authController.signup);

router.post("/auth/login", authController.loginScript);
router.post("/auth/signup", authController.signupScript);

export default router;
