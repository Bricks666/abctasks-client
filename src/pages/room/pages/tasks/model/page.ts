import { routes } from '@/shared/configs';
import { createPageLoadModel } from '@/shared/lib';

export const {
	loaded,
	loadedWithRouteState,
	mounted,
	unmounted,
	currentRoute,
} = createPageLoadModel(routes.room.tasks);
