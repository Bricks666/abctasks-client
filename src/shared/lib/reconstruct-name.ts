import { constructName } from './construct-name';

export const reconstructName = (name: string, ...parts: string[]): string => {
	const nameParts = name.split('.');

	const startIndex = Math.max(nameParts.length - parts.length, 0);

	nameParts.splice(startIndex, parts.length, ...parts);

	return constructName(...nameParts);
};
