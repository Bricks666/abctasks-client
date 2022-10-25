import { Query, AddType } from '@/types';

export const prepareQuery = (
	query: Query,
	defaultValue?: string,
	deletedQuery: AddType<Query, boolean> = {}
): URLSearchParams => {
	const newQuery = new URLSearchParams(defaultValue);

	Object.entries(query).forEach(([key, value]) => {
		const deletedValue = deletedQuery[key];
		if (typeof value !== 'undefined' && value !== null) {
			newQuery.set(key, value.toString());
		} else if (deletedValue) {
			newQuery.delete(key);
		}
	});

	return newQuery;
};
