class ContactController {
	// [GET] /contact
	async index(req, res) {
		res.render("contact", {
			css: ["css/profile.css"],
			title: "Contact",
		});
	}

	// [GET] /contact/:slug
	async page404(req, res) {
		res.render("404page");
	}

	// [GET] /contact/troll
	async troll(req, res) {
		res.render("contact/troll");
	}
}

export default new ContactController();
