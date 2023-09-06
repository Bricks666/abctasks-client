import { RouteRecord, createRouteView } from 'atomic-router-react';
import { lazy } from 'react';

import { RoomPageLayout } from '@/widgets/rooms';

import { PageLoader } from '@/shared/ui';

import { authorizedRoute, currentRoute } from './model';

const Page = lazy(() => import('./page'));

export const roomActivitiesPage: RouteRecord<any, any> = {
	route: currentRoute,
	view: createRouteView<any, any, any>({
		route: authorizedRoute,
		view: Page,
		otherwise: PageLoader,
	}),
	layout: RoomPageLayout,
};
