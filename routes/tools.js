import ToolsController from "../apps/controllers/T/ToolsController.js";
import express from "express";
const router = express.Router();

router.get("/downtik", ToolsController.downtik);
router.post("/downtik/:slug", ToolsController.postDT);
router.get("/", ToolsController.index);

export default router;
