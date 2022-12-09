import { experimental_extendTheme as extendTheme } from '@mui/material';

export const theme = extendTheme({
	shape: {
		borderRadius: 8,
	},
	spacing: (tab: number) => `${tab}rem`,
});
