import * as React from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'atomic-router-react';
import { createBrowserHistory } from 'history';
import { App } from '@/app';
import { router } from '@/models';
import { theme } from '@/types';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import '@/models/init';
import '@/i18n';

import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const history = createBrowserHistory();

router.setHistory(history);

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
