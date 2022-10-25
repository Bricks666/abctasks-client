import { createTheme } from '@mui/material';

export const theme = createTheme({
	shape: {
		borderRadius: 8,
	},
	spacing: (tab: number) => `${tab}rem`,
});
