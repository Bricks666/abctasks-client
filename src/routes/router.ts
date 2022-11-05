import { createHistoryRouter, createRouterControls } from 'atomic-router';
import { createBrowserHistory } from 'history';
import { routes, notFoundRoute } from './routes';

export const controls = createRouterControls();
const router = createHistoryRouter({
	routes,
	controls,
	notFoundRoute,
});
router.setHistory(
	createBrowserHistory({
		window,
	})
);
export { router };
