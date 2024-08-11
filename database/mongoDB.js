import mongoose from "mongoose";

export function connect() {
	mongoose
		.connect("mongodb://localhost:27017")
		.then(() => console.log("Connected Successfully!"))
		.catch((err) => console.error(err));
}
