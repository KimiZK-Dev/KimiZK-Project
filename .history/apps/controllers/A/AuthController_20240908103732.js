import userDB from "../../../database/models/userDB.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { mutipleMGToObj } from "../../../database/mongoose.js";

class AuthController {
	// [GET] /forms/noti
	noti(req, res, next) {
		res.render("forms/noti", {
			title: "Thông báo truy cập!",
		});
	}
	// [GET] /form/login
	signin(req, res, next) {
		res.render("forms/signin", {
			css: ["/css/forms.css"],
			title: "Đăng Nhập",
		});
	}
	// [GET] /forms/signup
	signup(req, res, next) {
		res.render("forms/signup", {
			css: ["/css/forms.css"],
			title: "Đăng Ký",
		});
	}
	// [GET] /forms/logout/
	logout(req, res, next) {
		res.clearCookie("token");
		res.redirect("/forms/signin");
	}

	// [POST] /forms/signin
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
				const token = jwt.sign({ userName }, process.env.JWT_SECRET, {
					expiresIn: "1h",
				});

				res.cookie("token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					maxAge: 3600000, // 1 giờ
				});

				res.status(200).send("Đăng nhập thành công!");
			} else {
				return res.status(401).send("Sai mật khẩu.");
			}
		} catch (e) {
			console.error("Error:", e);
			return res.status(500).send("Lỗi máy chủ nội bộ.");
		}
	}

	// [POST] /forms/signup
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
