import { createDomain, sample } from 'effector';
import { routes } from '@/shared/configs';

const roomPageDomain = createDomain();

export const loaded = roomPageDomain.event();
export const loadedWithRouteParams = sample({
	clock: loaded,
	source: routes.room.$params,
	fn: (params) => ({ params, }),
});
