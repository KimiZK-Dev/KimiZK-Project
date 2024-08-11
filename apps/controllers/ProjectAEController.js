import projectAEDB from "../../database/models/projectAEDB.js";
import { mutipleMGToObj, mgToObj } from "../../database/mongoose.js";

class siteController {
	// [GET]
	async index(req, res, next) {
		try {
			res.render("projectAE/", {
				item: mutipleMGToObj(await projectAEDB.find({})),
			});
		} catch (err) {
			res.status(400).json({ error: "ERROR!!!" });
			next(err);
		}
	}

	// [GET]
	async view(req, res, next) {
		try {
			const test = await projectAEDB.findOne({ slug: req.params.slug });
			if (test) {
				res.render("projectAE/view", {
					test: mgToObj(test),
					updateTime: test.updatedAt.toLocaleString(),
				});
			} else {
				res.status(404).json({ error: "Test not found" });
			}
		} catch (err) {
			res.status(400).json({ error: "ERROR!!!" });
			next(err);
		}
	}

	// [GET]
	async manage(req, res, next) {
		try {
			const [items, count] = await Promise.all([
				projectAEDB.find({}).sortable(req),
				projectAEDB.countDocuments(),
			]);
			res.render("projectAE/manage", {
				items: mutipleMGToObj(items),
				count,
			});
		} catch (err) {
			res.status(400).json({ error: "ERROR!!!" });
			next(err);
		}
	}

	// [GET]
	async add(req, res, next) {
		res.render("projectAE/add");
	}

	// [GET]
	async trash(req, res, next) {
		try {
			const [items, count] = await Promise.all([
				projectAEDB.findWithDeleted({ deleted: true }).sortable(req),
				projectAEDB.countDocumentsWithDeleted({ deleted: true }),
			]);
			res.render("projectAE/trash", {
				items: mutipleMGToObj(items),
				count,
			});
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: "ERROR!!!" });
			next(err);
		}
	}

	// [GET]
	async edit(req, res, next) {
		try {
			const item = await projectAEDB.findById(req.params.id);
			item
				? res.render("projectAE/edit", { item: mgToObj(item) })
				: res.status(404).json({ error: "Item not found!" });
		} catch (err) {
			res.status(400).json({ error: "ERROR!!!" });
			next(err);
		}
	}

	// [POST]
	async store(req, res, next) {
		const data = new projectAEDB(req.body);
		await data.save();
		res.redirect("back");
	}

	// [POST]
	async update(req, res, next) {
		try {
			const updateResult = await projectAEDB.updateOne(
				{ _id: req.params.id },
				req.body
			);
			if (updateResult.nModified === 0) {
				res.status(404).json({
					error: "Test not found or no change in data",
				});
			} else {
				res.redirect("/projectAE/manage");
			}
		} catch (err) {
			res.status(400).json({ error: "ERROR!!!" });
			next(err);
		}
	}

	// [POST]
	async actionForm(req, res, next) {
		switch (req.body.action) {
			case "restore":
				try {
					await projectAEDB.restore({
						_id: { $in: req.body.itemIDs },
					});
					res.redirect("back");
				} catch (err) {
					next(err);
				}
				break;
			case "delete":
				try {
					await projectAEDB.deleteMany({
						_id: { $in: req.body.itemIDs },
					});
					res.redirect("back");
				} catch (err) {
					res.status(400).json({ error: "ERROR!!!" });
					next(err);
				}
				break;
			case "remove":
				try {
					await projectAEDB.delete({
						_id: { $in: req.body.itemIDs },
					});
					res.redirect("back");
				} catch (err) {
					res.status(400).json({ error: "ERROR!!!" });
					next(err);
				}
				break;
			default:
				res.json({ message: "Action is invalid" });
		}
	}

	// [DELETE]
	async remove(req, res, next) {
		try {
			await projectAEDB.delete({ _id: req.params.id });
			res.redirect("back");
		} catch (err) {
			res.status(400).json({ error: "ERROR!!!" });
			next(err);
		}
	}

	// [DELETE]
	async delete(req, res, next) {
		try {
			const deleteResult = await projectAEDB.deleteOne({
				_id: req.params.id,
			});
			if (deleteResult.deletedCount === 0) {
				res.status(404).json({ error: "ProjectAE not found" });
			} else {
				res.redirect("back");
			}
		} catch (err) {
			res.status(400).json({ error: "ERROR!!!" });
			next(err);
		}
	}

	// [PATCH]
	async restore(req, res, next) {
		try {
			await projectAEDB.restore({ _id: req.params.id });
			res.redirect("back");
		} catch (err) {
			next(err);
		}
	}
}

export default new siteController();
