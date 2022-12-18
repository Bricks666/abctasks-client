import {
	Experimental_CssVarsProvider as CssVarsProvider,
	StyledEngineProvider,
	experimental_extendTheme as extendTheme
} from '@mui/material';
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
					<StyledEngineProvider injectFirst>
						<Component />
					</StyledEngineProvider>
				</CssVarsProvider>
			);
		};
