import { RouteRecord, createRouteView } from 'atomic-router-react';
import { lazy } from 'react';

import { PageLoader } from '@/shared/ui';

import { currentRoute, anonymousRoute } from './model';

const Page = lazy(() => import('./page'));

export const registrationPage: RouteRecord<any, any> = {
	route: currentRoute,
	view: createRouteView({
		route: anonymousRoute,
		view: Page,
		otherwise: PageLoader,
	}),
};
