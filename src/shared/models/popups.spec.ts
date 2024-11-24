import { allSettled, fork, Scope } from 'effector';
import { createMemoryHistory } from 'history';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { getParams, router } from '../configs';

import {
	$mountedPopups,
	$popups,
	close,
	closeSynced,
	open,
	openSynced
} from './popups';

vi.useFakeTimers();

describe('shared/models/popups', () => {
	const name = 'test-popup-name';
	let scope: Scope;

	beforeEach(async () => {
		scope = fork();

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory({
				initialEntries: ['/rooms'],
			}),
		});
	});

	describe('without query sync', () => {
		test('should open popup', async () => {
			const promise = allSettled(open, { scope, params: name, });

			await vi.advanceTimersByTimeAsync(250);

			await promise;

			expect(scope.getState($popups)).toStrictEqual([name]);
		});

		test('should close popup', async () => {
			const promise1 = allSettled(open, { scope, params: name, });

			await vi.advanceTimersByTimeAsync(250);

			await promise1;

			const promise2 = allSettled(close, { scope, params: name, });

			await vi.advanceTimersByTimeAsync(250);

			await promise2;

			expect(scope.getState($popups)).toStrictEqual([]);
		});

		test('should do nothing if try to close non-opened popup', async () => {
			const promise1 = allSettled(open, { scope, params: name, });
			await vi.advanceTimersByTimeAsync(250);

			await promise1;

			const promise2 = allSettled(close, {
				scope,
				params: 'another-name',
			});
			await vi.advanceTimersByTimeAsync(250);

			await promise2;

			expect(scope.getState($popups)).toStrictEqual([name]);
		});

		test('should allow open several time the same popups', async () => {
			const promise1 = allSettled(open, { scope, params: name, });
			await vi.advanceTimersByTimeAsync(250);

			await promise1;

			const promise2 = allSettled(open, { scope, params: name, });
			await vi.advanceTimersByTimeAsync(250);

			await promise2;

			expect(scope.getState($popups)).toStrictEqual([name, name]);
		});

		test('should update mounted popup with 250ms delay', async () => {
			const promise = allSettled(open, { scope, params: name, });

			expect(scope.getState($mountedPopups)).toStrictEqual([]);

			await vi.advanceTimersByTimeAsync(250);
			await promise;

			expect(scope.getState($mountedPopups)).toStrictEqual([name]);
		});
	});

	describe('with query sync', () => {
		test('should close popup', async () => {
			const promise1 = allSettled(openSynced, { scope, params: name, });

			await vi.advanceTimersByTimeAsync(250);

			await promise1;

			const promise2 = allSettled(closeSynced, { scope, params: name, });

			await vi.advanceTimersByTimeAsync(250);

			await promise2;

			expect(scope.getState($popups)).toStrictEqual([]);
			expect(scope.getState(router.$query)).toStrictEqual({});
		});

		test('should open popup', async () => {
			const promise = allSettled(openSynced, { scope, params: name, });

			await vi.advanceTimersByTimeAsync(250);

			await promise;

			expect(scope.getState($popups)).toStrictEqual([name]);
			expect(scope.getState(router.$query)).toStrictEqual({
				[getParams.popup]: name,
			});
		});

		test('should do nothing if try to close non-opened popup', async () => {
			const promise1 = allSettled(openSynced, { scope, params: name, });
			await vi.advanceTimersByTimeAsync(250);

			await promise1;

			const promise2 = allSettled(closeSynced, {
				scope,
				params: 'another-name',
			});
			await vi.advanceTimersByTimeAsync(250);

			await promise2;

			expect(scope.getState($popups)).toStrictEqual([name]);
			expect(scope.getState(router.$query)).toStrictEqual({
				[getParams.popup]: name,
			});
		});

		test('should allow open several time the same popups', async () => {
			const promise1 = allSettled(openSynced, { scope, params: name, });
			await vi.advanceTimersByTimeAsync(250);

			await promise1;

			const promise2 = allSettled(openSynced, { scope, params: name, });
			await vi.advanceTimersByTimeAsync(250);

			await promise2;

			expect(scope.getState($popups)).toStrictEqual([name, name]);
			expect(scope.getState(router.$query)).toStrictEqual({
				[getParams.popup]: [name, name].join(','),
			});
		});

		test('should update mounted popup with 250ms delay', async () => {
			const promise = allSettled(openSynced, { scope, params: name, });

			expect(scope.getState($mountedPopups)).toStrictEqual([]);

			await vi.advanceTimersByTimeAsync(250);
			await promise;

			expect(scope.getState($mountedPopups)).toStrictEqual([name]);
		});
	});
});
