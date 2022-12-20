import { createDomain, sample } from 'effector';
import { routes } from '@/shared/configs';

const roomsPageDomain = createDomain();

export const loaded = roomsPageDomain.event();
export const loadedWithRouteParams = sample({
	clock: loaded,
	source: routes.rooms.$params,
	fn: () => ({}),
});
