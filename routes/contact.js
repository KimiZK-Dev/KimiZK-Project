import ContactController from "../apps/controllers/ContactController.js";
import express from "express";

const router = express.Router();

router.get("/troll", ContactController.troll);
router.get("/:slug", ContactController.page404);
router.get("/", ContactController.index);

export default router;
