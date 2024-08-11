import mongoose from "mongoose";
import MGDelete from "mongoose-delete";
import slug from "mongoose-slug-updater";
import MGSequence from "mongoose-sequence";

const { Schema } = mongoose;
const PAE_Schema = new Schema(
	{
		projectID: Number,
		name: String,
		desc: String,
		preview: String,
		downLink: String,
		slug: { type: String, slug: "name" },
	},
	{
		timestamps: true,
	}
);

PAE_Schema.query.sortable = function (req) {
	const type = req.query.type;
	const isValidType = ["asc", "desc"].includes(type);
	if (req.query.hasOwnProperty("sort")) {
		return this.sort({
			[req.query.col]: isValidType ? type : "desc",
		});
	}
	return this;
};

mongoose.plugin(slug);
PAE_Schema.plugin(MGDelete, { deletedAt: true, overrideMethods: "all" });
PAE_Schema.plugin(MGSequence(mongoose), { inc_field: "projectID" });

const projectAEDB = mongoose.model("projectAEDB", PAE_Schema);
export default projectAEDB;
