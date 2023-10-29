import {
	RouteInstance,
	RouteParams,
	RouteParamsAndQuery,
	chainRoute
} from 'atomic-router';
import { Event, createEvent, sample } from 'effector';
import { not } from 'patronum';

import { internalRoutingModel } from '../models';
import { ChainedParams } from '../types';

export const chainHiddenRoute = <Params extends RouteParams>(
	route: RouteInstance<Params>,
	options?: ChainedParams
): RouteInstance<Params> => {
	const startNavigationChecking = createEvent<RouteParamsAndQuery<Params>>();
	const userNavigated = createEvent();
	const internalNavigated = createEvent();

	sample({
		clock: startNavigationChecking,
		filter: internalRoutingModel.$internalRoute.$flag,
		target: internalNavigated,
	});

	sample({
		clock: startNavigationChecking,
		filter: not(internalRoutingModel.$internalRoute.$flag),
		target: userNavigated,
	});

	if (options?.otherwise) {
		sample({
			clock: userNavigated,
			target: options.otherwise as Event<any>,
		});
	}

	return chainRoute({
		route,
		beforeOpen: startNavigationChecking,
		openOn: internalNavigated,
		cancelOn: userNavigated,
	});
};
