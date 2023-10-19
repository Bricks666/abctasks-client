export type Grouped<K extends string | number, T> = {
	[Key in K]: T[];
};

export const group = <T extends Record<string, any>, K extends keyof T>(
	array: T[],
	key: K
): Grouped<T[K], T> => {
	return array.reduce((grouped, item) => {
		const value = item[key];

		if (!grouped[value]) {
			grouped[value] = [];
		}

		grouped[value].push(item);

		return grouped;
	}, {} as Grouped<T[K], T>);
};
