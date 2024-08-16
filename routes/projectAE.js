import express from "express";
import ProjectAEController from "../apps/controllers/P/ProjectAEController.js";

const router = express.Router();

router.get("/add", ProjectAEController.add);
router.get("/trash", ProjectAEController.trash);
router.get("/manage", ProjectAEController.manage);
router.get("/view/:slug", ProjectAEController.view);
router.get("/edit/:id", ProjectAEController.edit);

router.post("/store", ProjectAEController.store);
router.put("/edit/update/:id", ProjectAEController.update);
router.post("/trash/action-form", ProjectAEController.actionForm);
router.post("/manage/action-form", ProjectAEController.actionForm);
router.delete("/manage/remove/:id", ProjectAEController.remove);
router.delete("/trash/delete/:id", ProjectAEController.delete);
router.patch("/trash/restore/:id", ProjectAEController.restore);
router.delete("/manage/remove/:id", ProjectAEController.remove);

router.get("/", ProjectAEController.index);

export default router;
