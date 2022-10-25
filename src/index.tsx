import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import { ErrorBoundary } from './components/ErrorBoundary';
import { theme } from './types/styles';
import './models/init';
import './i18n';

import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</ThemeProvider>
	</BrowserRouter>
);
