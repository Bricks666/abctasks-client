import { RouteRecord, createRouteView } from 'atomic-router-react';
import { lazy } from 'react';

import { RoomLayout } from '@/widgets/rooms';

import { PageLoader } from '@/shared/ui';

import { currentRoute, authorizedRoute } from './model';

const Page = lazy(() => import('./page'));

export const settingsPage: RouteRecord<any, any> = {
	route: currentRoute,
	view: createRouteView<any, any, any>({
		route: authorizedRoute,
		view: Page,
		otherwise: PageLoader,
	}),
	layout: RoomLayout,
};
