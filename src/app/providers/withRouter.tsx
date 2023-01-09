import { createHistoryRouter, redirect } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { routes, controls } from '@/shared/configs';
import { LoadingIndicator } from '@/shared/ui';

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
			path: '/rooms/:id/:tab?',
			route: routes.room,
		}
	],
	controls,
});
redirect({
	clock: router.routeNotFound,
	route: routes.rooms,
});

router.setHistory(createBrowserHistory());

export const withRouter =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<RouterProvider router={router}>
					<React.Suspense fallback={<LoadingIndicator size='large' />}>
						<Component />
					</React.Suspense>
				</RouterProvider>
			);
		};
