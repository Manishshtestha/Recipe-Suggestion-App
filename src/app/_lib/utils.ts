export const toPascalCase = (str: string): string => {
	return str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");
};
export const toKebabCase = (str: string): string => {
	return str
		.split(" ")
		.map((word) => word.toLowerCase())
		.join("-");
};
export const toSnakeCase = (str: string): string => {
	return str
		.split(" ")
		.map((word) => word.toLowerCase())
		.join("_");
};
export const toCamelCase = (str: string): string => {
	return str
		.split(" ")
		.map((word, index) =>
			index === 0
				? word.toLowerCase()
				: word.charAt(0).toUpperCase() + word.slice(1)
		)
		.join("");
};
export const toTitleCase = (str: string): string => {
	return str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};
export const toSentenceCase = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
