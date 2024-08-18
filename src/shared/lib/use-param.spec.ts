import { createHistoryRouter, createRoute } from 'atomic-router';
import { beforeEach, describe, expect, test } from 'vitest';

import { useParam } from './use-param';

import {
	RenderHookResult,
	Scope,
	act,
	allSettled,
	fork,
	renderHook,
	useTestRouter
} from '~/test-utils';

describe('shared/lib/use-param', () => {
	const route = createRoute<{ name: string }>();
	const router = createHistoryRouter({
		routes: [
			{
				path: '/path/:name',
				route,
			}
		],
	});
	const name = 'name';
	const value = 'value';
	const anotherValue = 'anotherValue';
	let scope: Scope;

	let wrapper: RenderHookResult<string, void>;

	const createComponent = () => {
		wrapper = renderHook(() => useParam(route, name), { scope, router, });
	};

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({
			scope,
			router,
			options: {
				initialEntries: [`/path/${value}`],
			},
		});

		await act(() => createComponent());
	});

	test('should return param via passed name', async () => {
		expect(wrapper.result.current).toBe(value);

		await act(() =>
			allSettled(route.open, { scope, params: { [name]: anotherValue, }, })
		);

		expect(wrapper.result.current).toBe(anotherValue);
	});
});
