import compose from 'compose-function';

import { withErrorBoundary } from './withErrorBoundary';
import { withGlobalStyles } from './withGlobalStyles';
import { withI18n } from './withI18n';
import { withNotifications } from './withNotifications';
import { withRouter } from './withRouter';
import { withStrictMode } from './withStrictMode';

export const withProviders = compose(
	withStrictMode,
	withI18n,
	withRouter,
	withGlobalStyles,
	withErrorBoundary,
	withNotifications
);
