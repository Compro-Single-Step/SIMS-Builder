const constants = {
	httpResponseMessages: {
		/* 2xx */
		ok: 'OK.',
		created: 'Created.',
		noContent: 'No content.',
		/* 3xx */
		notModified: 'Not modified',
		/* 4xx */
		badRequest: 'Bad request.',
		forbidden: 'Forbidden.',
		unauthorized: 'Unauthorized',
		notFound: 'Not found.',
		conflict: 'Conflict.',
		unprocessableEntity: 'Unprocessable entity.',
		/* 5xx */
		internalServerError: 'Internal server error.',
		/* General */
		deleted: 'Deleted.'
	},
	fileTypes: {
		"SKILL_CONFIG": "skillConfig",
		"RESOURCE": "uploadedResource",
		"XML": "xml"
	},
	skillConfigType: {
		"UI_CONFIG": "uiconfig",
		"IO_MAP": "iomap",
		"XML": "xml",
		"MODEL": "model"
	}
};

module.exports = constants;
