import Handlebars from "handlebars";

export const sum = (a, b) => a + b;

export const time = (t) => t?.toLocaleString() || "No date available";

export const sortable = (field, sort) => {
	const sortOptions = {
		default: {
			icon: "fa-solid fa-sort ms-1",
			nextType: "desc",
		},
		desc: {
			icon: "fa-duotone fa-solid fa-sort fa-rotate-180 ms-1",
			nextType: "asc",
		},
		asc: {
			icon: "fa-duotone fa-solid fa-sort ms-1",
			nextType: "default",
		},
	};

	const { icon, nextType } =
		sortOptions[field === sort.column ? sort.type : "default"];
	const href = Handlebars.escapeExpression(
		`?sort&col=${field}&type=${nextType}`
	);

	return new Handlebars.SafeString(
		`<a href="${href}"><i class="${icon}"></i></a>`
	);
};
