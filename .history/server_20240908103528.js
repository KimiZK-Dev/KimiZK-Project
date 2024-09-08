import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import methodOverride from "method-override";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import { connect } from "./database/mongoDB.js";
import router from "./routes/router.js";
import sortMW from "./apps/middlewares/sortMW.js";
import JWT from "./apps/middlewares/JWT.js";
import * as handlebarsHelpers from "./helpers/handlebars.js";

const port = 3001 || process.env.PORT;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(methodOverride("_method"));
app.use("/tools", express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
	if (
		req.path === "/forms/signin" ||
		req.path === "/forms/signup" ||
		req.path === "/forms/noti"
	) {
		return next();
	}
	JWT(req, res, next);
});
app.use(sortMW);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		helpers: handlebarsHelpers,
	})
);

connect();
router(app);
app.listen(port, (err) => {
	if (err) return res.json({ err });
	console.log(`Server listening on port: ${port}`);
});
