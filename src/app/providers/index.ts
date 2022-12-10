import compose from 'compose-function';
import { withErrorBoundary } from './withErrorBoundary';
import { withGlobalStyles } from './withGlobalStyles';
import { withRouter } from './withRouter';

export const withProviders = compose(
	withRouter,
	withGlobalStyles,
	withErrorBoundary
);
