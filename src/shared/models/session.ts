import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import {
	RouteInstance,
	RouteParams,
	RouteParamsAndQuery,
	chainRoute
} from 'atomic-router';
import {
	combine,
	sample,
	createEvent,
	Effect,
	createStore,
	createEffect,
	Event
} from 'effector';
import { equals } from 'patronum';

import { User, AuthResponse, authResponse, authApi } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

type Status = 'initial' | 'pending' | 'authorized' | 'anonymous';

export const $user = createStore<User | null>(null);
export const $status = createStore<Status>('initial');
export const $isAuth = $status.map((status) => status === 'authorized');
export const setUser = createEvent<User | null>();

const handlerFx = createEffect(authApi.auth);

export const query = createQuery<
	void,
	StandardResponse<AuthResponse>,
	Error,
	StandardResponse<AuthResponse>,
	AuthResponse
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(authResponse)),
	mapData: dataExtractor,
});

sample({
	clock: query.start,
	filter: equals($status, 'initial'),
	fn: () => 'pending' as const,
	target: $status,
});

sample({
	clock: query.finished.success,
	fn: () => 'authorized' as const,
	target: $status,
});

sample({
	clock: query.finished.failure,
	fn: () => 'anonymous' as const,
	target: $status,
});

sample({
	clock: query.finished.success,
	fn: ({ result, }) => result.user,
	target: $user,
});

interface ChainedParams {
	readonly otherwise?: Event<any> | Effect<any, any>;
}

export const chainAuthorized = <Params extends RouteParams>(
	route: RouteInstance<Params>,
	options?: ChainedParams
): RouteInstance<Params> => {
	const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
	const alreadyAnonymous = createEvent();
	const alreadyAuthorized = createEvent();
	const sessionCheckSuccessful = createEvent();
	const sessionCheckFailure = createEvent();

	const $paramsAndQuery = combine({
		params: route.$params,
		query: route.$query,
	});

	sample({
		clock: sessionCheckStarted,
		filter: equals($status, 'initial'),
		target: query.start,
	});

	sample({
		clock: sessionCheckStarted,
		source: $paramsAndQuery,
		filter: equals($status, 'anonymous'),
		target: alreadyAnonymous,
	});

	sample({
		clock: sessionCheckStarted,
		source: $paramsAndQuery,
		filter: equals($status, 'authorized'),
		target: alreadyAuthorized,
	});

	sample({
		clock: [alreadyAnonymous, query.finished.failure],
		source: $paramsAndQuery,
		filter: route.$isOpened,
		target: sessionCheckFailure,
	});

	sample({
		clock: [alreadyAuthorized, query.finished.success],
		source: $paramsAndQuery,
		filter: route.$isOpened,
		target: sessionCheckSuccessful,
	});

	if (options?.otherwise) {
		sample({
			clock: sessionCheckFailure,
			target: options.otherwise as Event<any>,
		});
	}

	return chainRoute({
		route,
		beforeOpen: sessionCheckStarted,
		openOn: sessionCheckSuccessful,
		cancelOn: sessionCheckFailure,
	});
};

export const chainAnonymous = <Params extends RouteParams>(
	route: RouteInstance<Params>,
	options?: ChainedParams
): RouteInstance<Params> => {
	const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
	const alreadyAnonymous = createEvent();
	const alreadyAuthorized = createEvent();
	const sessionCheckSuccessful = createEvent();
	const sessionCheckFailure = createEvent();

	const $paramsAndQuery = combine({
		params: route.$params,
		query: route.$query,
	});

	sample({
		clock: sessionCheckStarted,
		filter: equals($status, 'initial'),
		target: query.start,
	});

	sample({
		clock: sessionCheckStarted,
		source: $paramsAndQuery,
		filter: equals($status, 'anonymous'),
		target: alreadyAnonymous,
	});

	sample({
		clock: sessionCheckStarted,
		source: $paramsAndQuery,
		filter: equals($status, 'authorized'),
		target: alreadyAuthorized,
	});

	sample({
		clock: [alreadyAnonymous, query.finished.failure],
		source: $paramsAndQuery,
		filter: route.$isOpened,
		target: sessionCheckFailure,
	});

	sample({
		clock: [alreadyAuthorized, query.finished.success],
		source: $paramsAndQuery,
		filter: route.$isOpened,
		target: sessionCheckSuccessful,
	});

	if (options?.otherwise) {
		sample({
			clock: sessionCheckSuccessful,
			filter: route.$isOpened,
			target: options.otherwise as Event<any>,
		});
	}

	return chainRoute({
		route,
		beforeOpen: sessionCheckStarted,
		openOn: sessionCheckFailure,
		cancelOn: sessionCheckSuccessful,
	});
};
