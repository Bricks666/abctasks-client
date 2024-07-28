import { createRoute } from 'atomic-router';
import { allSettled, createEffect, createStore } from 'effector';
import { describe, expect, test, vi } from 'vitest';

import { chainInternalRoute } from './chain-internal-route';

import { useTestScope } from '~/tests';

describe('shared/lib/chain-internal-route', () => {
	const { getScope, } = useTestScope();
	const $isInternal = createStore(false);
	const route = createRoute();
	const internalRoute = chainInternalRoute(route, { isInternal: $isInternal, });

	test('should open internal route if internal flag is true', async () => {
		await allSettled($isInternal, { scope: getScope(), params: true, });
		await allSettled(route.open, { scope: getScope(), });

		expect(getScope().getState(internalRoute.$isOpened)).toBeTruthy();
	});

	test('should close internal route if interla flag is false', async () => {
		await allSettled($isInternal, { scope: getScope(), params: false, });
		await allSettled(route.open, { scope: getScope(), });

		expect(getScope().getState(internalRoute.$isOpened)).toBeFalsy();
	});

	test('should not call otherwise fallback if route can be opened', async () => {
		const fn = vi.fn();
		const otherwiseFx = createEffect(fn);

		chainInternalRoute(route, {
			isInternal: $isInternal,
			otherwise: otherwiseFx,
		});

		await allSettled($isInternal, { scope: getScope(), params: true, });
		await allSettled(route.open, { scope: getScope(), });

		expect(fn).not.toHaveBeenCalled();
	});

	test('should call otherwise fallback if route cannot be opened', async () => {
		const fn = vi.fn();
		const otherwiseFx = createEffect(fn);

		chainInternalRoute(route, {
			isInternal: $isInternal,
			otherwise: otherwiseFx,
		});

		await allSettled($isInternal, { scope: getScope(), params: false, });
		await allSettled(route.open, { scope: getScope(), });

		expect(fn).toHaveBeenCalled();
	});
});
