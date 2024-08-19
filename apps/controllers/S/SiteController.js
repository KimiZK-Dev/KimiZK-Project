class siteController {
	async index(req, res, next) {
		res.render("home", {
			title: "Home Page",
			css: ["/css/site/home.css"],
		});
	}
}

export default new siteController();
