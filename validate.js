const gameSchema =
{
	type: "object",
	required: ["title", "size", "multiplayer","controllerSupport", "developer", "publisher", "releaseDate"],
	properties: {
		title: {
			type: "string",
			minLength: 1,
		},
		size: {
			type: "string",
			minLength: 1,
		},
		multiplayer: {
			type: "boolean",
		},
        controllerSupport: {
			type: "boolean",
		},
        developer: {
			type: "string",
			minLength: 1,
		},
        publisher: {
			type: "string",
			minLength: 1,
		},
        releaseDate: {
			type: "string",
			minLength: 1,
		},
	},
};

module.exports = { gameSchema}




