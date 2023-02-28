export const normalizeQuery = (
	object: Record<string, any>
): Record<string, string> => {
	const entries = Object.entries(object);

	return entries.reduce((object, [key, value]) => {
		if (value === undefined || value == null) {
			return object;
		}

		object[key] = value;
		return object;
	}, {} as Record<string, string>);
};
