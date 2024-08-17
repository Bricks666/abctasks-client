export const generateId = (max = 1000): number => {
	return Math.max(0, Math.floor(Math.random() * max));
};
