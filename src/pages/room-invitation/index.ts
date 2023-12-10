import { RouteRecord, createRouteView } from 'atomic-router-react';
import { lazy } from 'react';

import { PageLoader } from '@/shared/ui';

import { authorizedRoute, currentRoute, hiddenRoute } from './model';

const Page = lazy(() => import('./page'));

export const roomInvitationPage: RouteRecord<any, any> = {
	route: currentRoute,
	view: createRouteView({
		route: authorizedRoute,
		view: createRouteView({
			route: hiddenRoute,
			view: Page,
			otherwise: PageLoader,
		}),
		otherwise: PageLoader,
	}),
};
