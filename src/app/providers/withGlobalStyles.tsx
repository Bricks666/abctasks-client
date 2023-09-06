import {
	Experimental_CssVarsProvider as CssVarsProvider,
	StyledEngineProvider,
	experimental_extendTheme as extendTheme
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';

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
		// borderRadius: 8,
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
	},
});
