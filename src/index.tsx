import * as React from 'react';
import ReactDOM from 'react-dom/client';

import { appModel } from '@/shared/models';

import { App } from '@/app';

const container = document.getElementById('root') as HTMLElement;

appModel.started();

const root = ReactDOM.createRoot(container);
root.render(<App />);
