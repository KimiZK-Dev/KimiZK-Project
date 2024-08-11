import userDB from "../../database/models/userDB.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mutipleMGToObj } from "../../database/mongoose.js";

class AuthController {
	// [GET] /form/login
	login(req, res, next) {
		res.render("forms/login");
	}

	// [GET] /form/signup
	signup(req, res, next) {
		res.render("forms/signup");
	}

	// [POST] /form/login
	async loginScript(req, res, next) {
		const { userName, password } = req.body;
		try {
			const user = await userDB.findOne({ userName });
			if (!user) {
				return res.status(404).send("User not found.");
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				// Redirect or send a success response
				return res.send("Password is correct!");
			} else {
				return res.status(401).send("Invalid password.");
			}
		} catch (error) {
			console.error("Error:", error);
			return res.status(500).send("Internal server error.");
		}
	}

	// [POST] /form/signup
	async signupScript(req, res, next) {
		try {
			const hashedPass = await bcrypt.hash(req.body.password, 10);

			const data = new userDB({
				userName: req.body.userName,
				fullName: req.body.fullName,
				email: req.body.email,
				phone: req.body.phone,
				password: hashedPass,
				checkBox: req.body.checkBox,
			});

			await data.save();
			res.redirect("back");
		} catch (error) {
			console.error("Error:", error);
			next(error);
		}
	}
}

export default new AuthController();
