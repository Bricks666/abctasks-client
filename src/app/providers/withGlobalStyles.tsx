import {
	Experimental_CssVarsProvider as CssVarsProvider,
	StyledEngineProvider,
	experimental_extendTheme as extendTheme
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const withGlobalStyles =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<CssVarsProvider theme={theme}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<StyledEngineProvider injectFirst>
							<Component />
						</StyledEngineProvider>
					</LocalizationProvider>
				</CssVarsProvider>
			);
		};

const theme = extendTheme({
	shape: {
		borderRadius: 8,
	},
	spacing: (tab: number) => `${tab}rem`,

	components: {
		MuiButton: {
			defaultProps: {
				variant: 'contained',
				disableElevation: true,
			},
		},
		MuiPaper: {
			defaultProps: {
				variant: 'outlined',
				elevation: 0,
				sx: {
					borderWidth: 2,
				},
			},
		},
		MuiSkeleton: {
			styleOverrides: {
				root: {
					transform: 'scale(1)',
				},
			},
		},
	},
});
