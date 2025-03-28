type Part = string | number;
type Parts = Part[];

export const constructName = (...parts: Parts): string => {
	return parts.join('.');
};
