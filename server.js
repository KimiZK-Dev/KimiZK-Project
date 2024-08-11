import express from "express";
import methodOverride from "method-override";
import { engine } from "express-handlebars";
import { connect } from "./database/mongoDB.js";
import router from "./routes/router.js";
import { fileURLToPath } from "url";
import path from "path";
import sortMW from "./apps/middlewares/sortMW.js";
import * as handlebarsHelpers from "../sex/helpers/handlebars.js";

const port = 3000 || process.env.PORT;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
