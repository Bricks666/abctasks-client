import compose from 'compose-function';
import { withErrorBoundary } from './withErrorBoundary';
import { withGlobalStyles } from './withGlobalStyles';
import { withPopups } from './withPopups';
import { withRouter } from './withRouter';

export const withProviders = compose(
	withRouter,
	withGlobalStyles,
	withErrorBoundary,
	withPopups
);
