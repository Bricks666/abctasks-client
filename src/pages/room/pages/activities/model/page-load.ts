import { routes } from '@/shared/configs';
import { createPageLoadModel } from '@/shared/lib';

export const { loaded, loadedWithRouteState, } = createPageLoadModel(
	routes.room.activities
);
