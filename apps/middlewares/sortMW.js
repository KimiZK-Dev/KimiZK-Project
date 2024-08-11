const sortMW = (req, res, next) => {
	res.locals.sort = {
		enabled: false,
		type: "default",
		column: null,
	};

	if (req.query.hasOwnProperty("sort")) {
		Object.assign(res.locals.sort, {
			enabled: true,
			type: req.query.type || "default",
			column: req.query.col || null,
		});
	}

	next();
};

export default sortMW;
