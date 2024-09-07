import jwtfrom "jsonwebtoken";
const JWT = (req, res, next) => {
	const token = req.headers["authorization"];
	if (!token) return res.status(403).send("Token không được cung cấp");

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) return res.status(403).send("Token không hợp lệ");

		req.user = decoded;
		next();
	});
};
