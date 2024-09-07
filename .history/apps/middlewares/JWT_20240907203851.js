import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT = (req, res, next) => {
	const token = req.headers["authorization"];
	if (!token) return res.redirect("/forms/noti");

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.status(403).send("Token không hợp lệ");

		req.user = decoded;
		next();
	});
};

export default JWT;
