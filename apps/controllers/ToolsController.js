class ToolsController {
	// [GET] /tools/downtik
	downtik(req, res) {
		res.render("tools/downtik");
	}

	// [GET] /tools/upscale
	upscale(req, res) {
		res.render("tools/upscale");
	}

	// [GET] /tools
	index(req, res) {
		res.render("tools/");
	}
}

export default new ToolsController();
