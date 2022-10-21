const counts = [3, 4, 5, 2] as const;

export const EMPTY_ARRAYS = counts.reduce((acc, num) => {
	acc[num] = Array(num).fill('');
	return acc;
}, {} as Record<keyof typeof counts, Array<string>>);
