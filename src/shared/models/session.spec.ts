import { RouteInstance, createRoute } from 'atomic-router';
import { Event, createEvent } from 'effector';
import { beforeEach, describe, test, expect } from 'vitest';

import { ChainedParams } from '../types';

import { $user, chainAnonymous, chainAuthorized, query } from './session';

import {
	Scope,
	allSettled,
	defaultUser,
	fork,
	handlers,
	server
} from '~/test-utils';

describe('shared/models/session', () => {
	let scope: Scope;

	beforeEach(() => {
		scope = fork();
	});

	describe('authorization', () => {
		test('should set fetched user into $user store', async () => {
			await allSettled(query.start, { scope, });

			expect(scope.getState($user)).toStrictEqual(defaultUser);
		});

		test.skip('should reset user if query finished with error', async () => {
			await allSettled(query.start, { scope, });

			server.use(handlers.auth.error.auth);

			await allSettled(query.start, { scope, });

			server.use(handlers.auth.success.auth);

			expect(scope.getState($user)).toBeNull();
		});
	});

	describe('chainAuthorized', () => {
		let route: RouteInstance<any>;
		let chainedRoute: RouteInstance<any>;

		const chainRoute = (options?: ChainedParams) => {
			chainedRoute = chainAuthorized(route, options);
		};

		beforeEach(() => {
			route = createRoute();
		});

		describe('open', () => {
			beforeEach(() => {
				server.use(handlers.auth.success.auth);
			});

			test('should open route if user authorized successfuly', async () => {
				chainRoute();

				await allSettled(route.open, { scope, });

				expect(scope.getState(chainedRoute.$isOpened)).toBeTruthy();
			});

			test('should open route if user has already authorized successfuly', async () => {
				await allSettled(query.start, { scope, });

				chainRoute();

				await allSettled(route.open, { scope, });

				expect(scope.getState(chainedRoute.$isOpened)).toBeTruthy();
			});
		});

		describe('close', () => {
			let otherwise: Event<any>;

			beforeEach(() => {
				otherwise = createEvent();
				server.use(handlers.auth.error.auth);
			});

			test('should close route if user autorized failurly', async () => {
				chainRoute();

				await allSettled(route.open, { scope, });

				expect(scope.getState(chainedRoute.$isOpened)).toBeFalsy();
			});

			test('should close route if user has already autorized failurly', async () => {
				await allSettled(query.start, { scope, });

				chainRoute();

				await allSettled(route.open, { scope, });

				expect(scope.getState(chainedRoute.$isOpened)).toBeFalsy();
			});

			test('should call otherwise option if user autorized failurly', async () => {
				expect.assertions(1);

				await allSettled(query.start, { scope, });

				chainRoute({ otherwise, });

				const unwatch = otherwise.watch(() => {
					expect(true).toBeTruthy();
				});

				await allSettled(route.open, { scope, });

				unwatch();
			});

			test('should call otherwise option if user has already autorized failurly', async () => {
				expect.assertions(1);

				await allSettled(query.start, { scope, });

				chainRoute({ otherwise, });

				const unwatch = otherwise.watch(() => {
					expect(true).toBeTruthy();
				});

				await allSettled(route.open, { scope, });

				unwatch();
			});
		});
	});

	describe('chainAnonymous', () => {
		let route: RouteInstance<any>;
		let chainedRoute: RouteInstance<any>;

		const chainRoute = (options?: ChainedParams) => {
			chainedRoute = chainAnonymous(route, options);
		};

		beforeEach(() => {
			route = createRoute();
		});

		describe('open', () => {
			beforeEach(() => {
				server.use(handlers.auth.error.auth);
			});

			test('should open route if user authorized failurly', async () => {
				chainRoute();

				await allSettled(route.open, { scope, });

				expect(scope.getState(chainedRoute.$isOpened)).toBeTruthy();
			});

			test('should open route if user has already authorized failurly', async () => {
				await allSettled(query.start, { scope, });

				chainRoute();

				await allSettled(route.open, { scope, });

				expect(scope.getState(chainedRoute.$isOpened)).toBeTruthy();
			});
		});

		describe('close', () => {
			let otherwise: Event<any>;

			beforeEach(() => {
				otherwise = createEvent();
				server.use(handlers.auth.success.auth);
			});

			test('should close route if user autorized successfuly', async () => {
				chainRoute();

				await allSettled(route.open, { scope, });

				expect(scope.getState(chainedRoute.$isOpened)).toBeFalsy();
			});

			test.skip('should close route if user has already autorized successfuly', async () => {
				await allSettled(query.start, { scope, });

				chainRoute();

				await allSettled(route.open, { scope, });

				expect(scope.getState(chainedRoute.$isOpened)).toBeFalsy();
			});

			test('should call otherwise option if user autorized successfuly', async () => {
				expect.assertions(1);

				await allSettled(query.start, { scope, });

				chainRoute({ otherwise, });

				const unwatch = otherwise.watch(() => {
					expect(true).toBeTruthy();
				});

				await allSettled(route.open, { scope, });

				unwatch();
			});

			test('should call otherwise option if user has already autorized successfuly', async () => {
				expect.assertions(1);

				await allSettled(query.start, { scope, });

				chainRoute({ otherwise, });

				const unwatch = otherwise.watch(() => {
					expect(true).toBeTruthy();
				});

				await allSettled(route.open, { scope, });

				unwatch();
			});
		});
	});
});
