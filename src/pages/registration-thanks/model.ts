import { querySync } from 'atomic-router';
import { createStore, sample } from 'effector';

import { controls, routes } from '@/shared/configs';
import { chainInternalRoute } from '@/shared/lib';
import { internalRoutingModel, sessionModel } from '@/shared/models';

export const currentRoute = routes.registration.thanks;
export const anonymousRoute = sessionModel.chainAnonymous(currentRoute, {
	otherwise: routes.rooms.open,
});
export const hiddenRoute = chainInternalRoute(anonymousRoute, {
	otherwise: routes.login.open,
	isInternal: internalRoutingModel.$internalRoute.$flag,
});

export const $username = createStore('');
export const $email = createStore('');

/**
 * @todo Add guard for redirect from this route if user was not redirected from registration page
 */

querySync({
	source: {
		email: $email,
		username: $username,
	},
	route: hiddenRoute,
	clock: hiddenRoute.opened,
	controls,
});

sample({
	clock: hiddenRoute.closed,
	target: internalRoutingModel.$internalRoute.disable,
});
