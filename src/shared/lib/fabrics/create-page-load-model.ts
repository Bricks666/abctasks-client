import { RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { createEvent, Event, sample } from 'effector';

export interface PageLoadModel<T extends RouteParams> {
	readonly loaded: Event<void>;
	readonly loadedWithRouteState: Event<RouteParamsAndQuery<T>>;
	readonly mounted: Event<void>;
	readonly unmounted: Event<void>;
}

export const createPageLoadModel = <T extends RouteParams>(
	route: RouteInstance<T>
): PageLoadModel<T> => {
	const loaded = createEvent();
	const loadedWithRouteState = createEvent<RouteParamsAndQuery<T>>();
	const mounted = createEvent();
	const unmounted = createEvent();

	sample({
		clock: loaded,
		source: { params: route.$params, query: route.$query, },
		target: loadedWithRouteState,
	});

	return { loaded, loadedWithRouteState, mounted, unmounted, };
};
