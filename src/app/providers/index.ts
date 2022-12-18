import compose from 'compose-function';
import { withErrorBoundary } from './withErrorBoundary';
import { withGlobalStyles } from './withGlobalStyles';
import { withI18n } from './withI18n';
import { withPopups } from './withPopups';
import { withRouter } from './withRouter';

export const withProviders = compose(
	withRouter,
	withGlobalStyles,
	withErrorBoundary,
	withPopups,
	withI18n
);
