import mongoose from "mongoose";
const { Schema } = mongoose;
import AutoIncrement from "mongoose-sequence";

const userSchema = new Schema(
	{
		userID: Number,
		userName: { type: String, required: true, unique: true, trim: true },
		fullName: { type: String, required: true, trim: true },
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
		},
		phone: { type: String, required: true, trim: true },
		password: { type: String, required: true, maxLength: 1024 },
		checkBox: { type: String },
	},
	{
		timestamps: true,
	}
);

userSchema.plugin(AutoIncrement(mongoose), { inc_field: "userID" });

const userDB = mongoose.model("userDB", userSchema);
export default userDB;
