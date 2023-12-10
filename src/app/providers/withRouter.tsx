import { redirect } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';
import * as React from 'react';

import { router, routes } from '@/shared/configs';
import { appModel } from '@/shared/models';

redirect({
	clock: router.routeNotFound,
	route: routes.rooms.base,
});

sample({
	clock: appModel.started,
	fn: () => createBrowserHistory(),
	target: router.setHistory,
});

export const withRouter =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<RouterProvider router={router}>
					<Component />
				</RouterProvider>
			);
		};
