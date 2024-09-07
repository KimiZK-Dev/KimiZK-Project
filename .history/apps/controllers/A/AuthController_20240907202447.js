import userDB from "../../../database/models/userDB.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mutipleMGToObj } from "../../../database/mongoose.js";

class AuthController {
	// [GET] /form/login
	signin(req, res, next) {
		res.render("forms/signin", {
			css: ["/css/forms.css"],
			title: "Sign In",
		});
	}
	// [GET] /form/signup
	signup(req, res, next) {
		res.render("forms/signup", {
			css: ["/css/forms.css"],
			title: "Sign Up",
		});
	}

	// [POST] /form/login
	async signinScript(req, res, next) {
		const { userName, password } = req.body;
		try {
			const user = await userDB.findOne({ userName });

			if (!user) {
				return res
					.status(404)
					.send(`Không có người dùng tên: ${userName}`);
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				const token = jwt.sign(
					{ username: user.username },
					JWT_SECRET,
					{ expiresIn: "1h" }
				);

				// Gửi token tới client (có thể lưu vào cookies hoặc local storage)
				res.json({ token });
			} else {
				return res.status(401).send("Invalid password.");
			}
		} catch (e) {
			console.error("Error:", e);
			return res.status(500).send("Internal server error.");
		}
	}

	// [POST] /form/signup
	async signupScript(req, res, next) {
		try {
			const hashedPass = await bcrypt.hash(req.body.password, 10);

			const data = new userDB({
				userName: req.body.userName,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
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
