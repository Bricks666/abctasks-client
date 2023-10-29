import { RouteRecord, createRouteView } from 'atomic-router-react';
import { lazy } from 'react';

import { PageLoader } from '@/shared/ui';

import { anonymousRoute, currentRoute, hiddenRoute } from './model';

const Page = lazy(() => import('./page'));

export const thanksRegistrationPage: RouteRecord<any, any> = {
	route: currentRoute,
	view: createRouteView({
		route: anonymousRoute,
		view: createRouteView({
			route: hiddenRoute,
			view: Page,
			otherwise: PageLoader,
		}),
		otherwise: PageLoader,
	}),
};
