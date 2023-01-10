import {
	Experimental_CssVarsProvider as CssVarsProvider,
	StyledEngineProvider,
	experimental_extendTheme as extendTheme
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';

export const theme = extendTheme({
	shape: {
		borderRadius: 8,
	},
	spacing: (tab: number) => `${tab}rem`,
});

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
