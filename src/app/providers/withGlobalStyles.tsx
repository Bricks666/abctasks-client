import {
	CssBaseline,
	Experimental_CssVarsProvider as CssVarsProvider,
	StyledEngineProvider,
	experimental_extendTheme as extendTheme
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';

import '@fontsource/roboto/latin-300-italic.css';
import '@fontsource/roboto/latin-300.css';
import '@fontsource/roboto/cyrillic-300-italic.css';
import '@fontsource/roboto/cyrillic-300.css';
import '@fontsource/roboto/latin-400-italic.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/cyrillic-400-italic.css';
import '@fontsource/roboto/cyrillic-400.css';
import '@fontsource/roboto/latin-500-italic.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/cyrillic-500-italic.css';
import '@fontsource/roboto/cyrillic-500.css';
import '@fontsource/roboto/latin-700-italic.css';
import '@fontsource/roboto/latin-700.css';
import '@fontsource/roboto/cyrillic-700-italic.css';
import '@fontsource/roboto/cyrillic-700.css';

export const withGlobalStyles =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<CssVarsProvider theme={theme}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<StyledEngineProvider injectFirst>
							<CssBaseline />
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
	colorSchemes: {
		dark: {
			palette: {
				common: {
					background: '#121212',
				},
			},
		},
	},
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
		MuiDialog: {
			styleOverrides: {
				paperFullScreen: {
					height: '100dvh',
				},
			},
		},
	},
});
