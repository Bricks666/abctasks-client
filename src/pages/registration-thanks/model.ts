import { sample } from 'effector';

import { routes } from '@/shared/configs';
import { chainInternalRoute, createQueryModel } from '@/shared/lib';
import { internalRoutingModel, sessionModel } from '@/shared/models';

export const currentRoute = routes.registration.thanks;
export const anonymousRoute = sessionModel.chainAnonymous(currentRoute, {
	otherwise: routes.rooms.base.open,
});
export const hiddenRoute = chainInternalRoute(anonymousRoute, {
	otherwise: routes.login.open,
	isInternal: internalRoutingModel.$internalRoute.$flag,
});

export const usernameQuery = createQueryModel({
	name: 'username',
	defaultValue: '',
	route: hiddenRoute,
	clock: hiddenRoute.opened,
});

export const emailQuery = createQueryModel({
	name: 'email',
	defaultValue: '',
	route: hiddenRoute,
	clock: hiddenRoute.opened,
});

sample({
	clock: hiddenRoute.closed,
	target: internalRoutingModel.$internalRoute.disable,
});
