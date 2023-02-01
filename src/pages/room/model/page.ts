import { routes } from '@/shared/configs';
import { createPageLoadModel } from '@/shared/lib';

export const { loaded, loadedWithRouteState, currentRoute, } =
	createPageLoadModel(routes.room.base);
