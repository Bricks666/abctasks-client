import { createRoute } from 'atomic-router';
import { createEffect, createStore } from 'effector';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { chainInternalRoute } from './chain-internal-route';

import { Scope, allSettled, fork } from '~/test-utils';

describe('shared/lib/chain-internal-route', () => {
	let scope: Scope;
	const $isInternal = createStore(false);
	const route = createRoute();
	const internalRoute = chainInternalRoute(route, { isInternal: $isInternal, });

	beforeEach(() => {
		scope = fork();
	});

	test('should open internal route if internal flag is true', async () => {
		await allSettled($isInternal, { scope, params: true, });
		await allSettled(route.open, { scope, });

		expect(scope.getState(internalRoute.$isOpened)).toBeTruthy();
	});

	test('should close internal route if interla flag is false', async () => {
		await allSettled($isInternal, { scope, params: false, });
		await allSettled(route.open, { scope, });

		expect(scope.getState(internalRoute.$isOpened)).toBeFalsy();
	});

	test('should not call otherwise fallback if route can be opened', async () => {
		const fn = vi.fn();
		const otherwiseFx = createEffect(fn);

		chainInternalRoute(route, {
			isInternal: $isInternal,
			otherwise: otherwiseFx,
		});

		await allSettled($isInternal, { scope, params: true, });
		await allSettled(route.open, { scope, });

		expect(fn).not.toHaveBeenCalled();
	});

	test('should call otherwise fallback if route cannot be opened', async () => {
		const fn = vi.fn();
		const otherwiseFx = createEffect(fn);

		chainInternalRoute(route, {
			isInternal: $isInternal,
			otherwise: otherwiseFx,
		});

		await allSettled($isInternal, { scope, params: false, });
		await allSettled(route.open, { scope, });

		expect(fn).toHaveBeenCalled();
	});
});
