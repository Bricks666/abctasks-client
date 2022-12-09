import * as React from 'react';
import {
	Experimental_CssVarsProvider as CssVarsProvider,
	StyledEngineProvider
} from '@mui/material';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'atomic-router-react';
import { createBrowserHistory } from 'history';
import { App } from '@/app';
import { router } from '@/models';
import { theme } from '@/types';
import { ErrorBoundary } from '@/components';
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
		<CssVarsProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</StyledEngineProvider>
		</CssVarsProvider>
	</RouterProvider>
);

console.debug(import.meta.env);
