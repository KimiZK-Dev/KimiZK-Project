import express from "express";
import SiteController from "../apps/controllers/S/SiteController.js";

const router = express.Router();

router.get("/", SiteController.index);

export default router;
