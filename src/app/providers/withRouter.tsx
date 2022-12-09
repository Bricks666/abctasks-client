import { createHistoryRouter } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { routes, controls } from '@/shared/configs';

const router = createHistoryRouter({
	routes: [
		{
			path: '/login',
			route: routes.login,
		},
		{
			path: '/registration',
			route: routes.registration,
		},
		{
			path: '/rooms',
			route: routes.rooms,
		},
		{
			path: '/rooms/:id',
			route: routes.room,
		}
	],
	controls,
});

router.setHistory(createBrowserHistory());

export const withRouter =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<RouterProvider router={router}>
					<Component />
				</RouterProvider>
			);
		};
