import { routes } from '@/shared/configs';
import { createPageLoadModel } from '@/shared/lib';

export const { loaded, loadedWithRouteState, mounted, unmounted, } =
	createPageLoadModel(routes.room.tags);
