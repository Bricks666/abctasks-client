const memo = new WeakMap<object>();

type Result<T> = {
	[key: string]: T[];
};

export const groupBy = <T>(
	items: T[],
	grouper: (item: T) => string
): Result<T> => {
	// eslint-disable-next-line sonarjs/no-empty-collection
	const memoize = memo.get(items);
	if (memoize !== undefined) {
		return memoize;
	}

	const result: Result<T> = {};

	items.forEach((item) => {
		const key = grouper(item);

		if (result[key]) {
			result[key].push(item);
		} else {
			result[key] = [item];
		}
	});

	memo.set(items, result);

	return result;
};
