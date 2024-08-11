export function mutipleMGToObj(mongooses) {
	return mongooses.map((mongoose) => mongoose.toObject());
}

export function mgToObj(mongoose) {
	return mongoose ? mongoose.toObject() : mongoose;
}
