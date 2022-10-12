import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import { ErrorBoundary } from './components/ErrorBoundary';
import './models/init';
import './i18n';

import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<BrowserRouter>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</BrowserRouter>
);
