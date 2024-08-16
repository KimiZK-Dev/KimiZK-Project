class siteController {
	async index(req, res, next) {
		res.render("home", {
			title: "Home Page",
			css: "/css/site/home.css",
			fb: "https://www.facebook.com/KimiZK.XYZ",
			inst: "https://www.instagram.com/KimiZK.Dev",
			ytb: "https://www.youtube.com/@KimiZK",
			pin: "https://www.pinterest.com/KimiZKDev",
		});
	}
}

export default new siteController();
