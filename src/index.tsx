import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app';
import '@/shared/models/init';
import '@/shared/i18n';

import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(<App />);
