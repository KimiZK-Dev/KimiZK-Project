import ToolsController from "../apps/controllers/ToolsController.js";
import express from "express";
const router = express.Router();

router.get("/downtik", ToolsController.downtik);
router.get("/", ToolsController.index);

export default router;
