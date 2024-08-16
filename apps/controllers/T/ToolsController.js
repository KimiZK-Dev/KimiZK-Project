import handleDT from "../../middlewares/handleDT.js";

class ToolsController {
	// [GET] /tools/downtik
	downtik(req, res) {
		res.render("tools/downtik");
	}

	// [POST] /tools/downtik
	async postDT(req, res) {
		const url = req.query.url;
		const handler = new handleDT();
		const { result, data } = await handler.getData(url);

		if (result.code !== 0) {
			return res.json({ err: "Sai định dạng link!" });
		}

		const commonData = {
			css: "/css/downtik.css",
			processedTime: result.processed_time + "s",
			userID: data.author.unique_id,
			nickname: data.author.nickname,
			title: data.title,
			hearts: data.digg_count,
			comments: data.comment_count,
			downloads: data.download_count,
			plays: data.play_count,
			downlink: data.play,
			audio: data.music_info.play,
		};

		const specificData = data.images
			? {
					duration: data.duration ? null : "Ảnh không có thời lượng!",
					size: data.size ? null : "Mỗi ảnh có kích thước khác nhau!",
					images: await handler.images(data.images),
			  }
			: {
					duration: data.duration ? `${data.duration}s` : null,
					size: data.size ? `${data.size}mb` : null,
					preview: data.ai_dynamic_cover,
			  };

		res.render("tools/downtik", { ...commonData, ...specificData });
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
