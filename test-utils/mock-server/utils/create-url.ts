import { join } from 'node:path';

export const createUrl = (...parts: string[]): string => {
	return join(...parts);
};
