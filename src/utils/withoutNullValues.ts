export const withoutNullValues = <T>(
	values: Array<T | undefined | null>
): Array<T> => {
	return values.filter((value): value is T => value != null);
};
