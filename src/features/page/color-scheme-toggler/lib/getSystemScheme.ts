import { ColorScheme } from '../types';

export const getSystemScheme = (
	preferDark: boolean
): Exclude<ColorScheme, 'system'> => {
	return preferDark ? 'dark' : 'light';
};
