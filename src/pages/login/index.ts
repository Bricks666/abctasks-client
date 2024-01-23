import { RouteRecord, createRouteView } from 'atomic-router-react';
import { lazy } from 'react';

import { PageLoader } from '@/shared/ui';

import { anonymousRoute, currentRoute } from './model';

const Page = lazy(() => import('./page'));

export const loginPage: RouteRecord<any, any> = {
	route: currentRoute,
	view: createRouteView({
		route: anonymousRoute,
		view: Page,
		otherwise: PageLoader,
	}),
};
