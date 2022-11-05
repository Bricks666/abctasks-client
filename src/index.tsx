import * as React from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'atomic-router-react';
import { theme } from '@/types';
import { App } from './app';
import { router } from './routes';
import { ErrorBoundary } from './components/ErrorBoundary';
import './models/init';
import './i18n';

import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<RouterProvider router={router}>
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</StyledEngineProvider>
		</ThemeProvider>
	</RouterProvider>
);
