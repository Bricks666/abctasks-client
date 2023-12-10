import {
	RouteInstance,
	RouteParams,
	RouteParamsAndQuery,
	chainRoute
} from 'atomic-router';
import { Event, Store, createEvent, sample } from 'effector';
import { not } from 'patronum';

import { ChainedParams } from '../types';

export interface ChainInternalRouteParams extends ChainedParams {
	readonly isInternal: Store<boolean>;
}

export const chainInternalRoute = <Params extends RouteParams>(
	route: RouteInstance<Params>,
	options: ChainInternalRouteParams
): RouteInstance<Params> => {
	const { isInternal, otherwise, } = options;

	const startNavigationChecking = createEvent<RouteParamsAndQuery<Params>>();
	const userNavigated = createEvent();
	const internalNavigated = createEvent();

	sample({
		clock: startNavigationChecking,
		filter: isInternal,
		target: internalNavigated,
	});

	sample({
		clock: startNavigationChecking,
		filter: not(isInternal),
		target: userNavigated,
	});

	if (otherwise) {
		sample({
			clock: userNavigated,
			target: otherwise as Event<any>,
		});
	}

	return chainRoute({
		route,
		beforeOpen: startNavigationChecking,
		openOn: internalNavigated,
		cancelOn: userNavigated,
	});
};
