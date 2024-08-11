class siteController {
	async index(req, res, next) {
		res.render("home", {
			title: "Home Page",
		});
	}
}

export default new siteController();
