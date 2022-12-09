import {
	Experimental_CssVarsProvider as CssVarsProvider,
	StyledEngineProvider
} from '@mui/material';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app';
import { ErrorBoundary } from '@/shared/components';
import { theme } from '@/types';
import '@/models/init';
import '@/i18n';

import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<CssVarsProvider theme={theme}>
		<StyledEngineProvider injectFirst>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</StyledEngineProvider>
	</CssVarsProvider>
);
