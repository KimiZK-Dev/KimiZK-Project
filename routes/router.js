import siteRouter from "./site.js";
import contactRouter from "./contact.js";
import projectAERouter from "./projectAE.js";
import authRouter from "./auth.js";
import toolsRouter from "./tools.js";

function router(app) {
	app.use("/tools", toolsRouter);
	app.use("/forms", authRouter);
	app.use("/projectAE", projectAERouter);
	app.use("/contact", contactRouter);
	app.use("/", siteRouter);
}

export default router;
