import {
	AsyncAction,
	Atom,
	atom,
	reatomAsync,
	withRetry
} from '@reatom/framework';
import { TestCtx, createTestCtx } from '@reatom/testing';
import { vi, beforeEach, afterEach, expect, describe, test } from 'vitest';

import { WithRetry, retryQuery } from './retry-query';

vi.useFakeTimers();

describe('retryQuery()', () => {
	let ctx: TestCtx;
	const handler = vi.fn().mockResolvedValue(123);
	let query: WithRetry<AsyncAction>;
	let storeAtom: Atom<number>;

	beforeEach(async () => {
		query = reatomAsync(handler, 'query').pipe(withRetry());
		storeAtom = atom(0, 'storeAtom');
		ctx = createTestCtx();

		await query(ctx);
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.clearAllMocks();
	});

	test('should retry query if store connected', async () => {
		retryQuery({
			query,
			store: storeAtom,
			timeout: 1000,
		});

		const subscription = ctx.subscribeTrack(storeAtom);

		expect(handler).toHaveBeenCalledTimes(1);

		await vi.advanceTimersByTimeAsync(1000);

		expect(handler).toHaveBeenCalledTimes(2);

		subscription.unsubscribe();
	});

	test('should do nothing if store is not connected', async () => {
		retryQuery({
			query,
			store: storeAtom,
			timeout: 1000,
		});

		expect(handler).toHaveBeenCalledTimes(1);

		await vi.advanceTimersByTimeAsync(1000);

		expect(handler).toHaveBeenCalledTimes(1);
	});

	test('should stop query retries if store disconnected', async () => {
		retryQuery({
			query,
			store: storeAtom,
			timeout: 1000,
		});

		const subscription = ctx.subscribeTrack(storeAtom);

		expect(handler).toHaveBeenCalledTimes(1);

		await vi.advanceTimersByTimeAsync(1000);

		expect(handler).toHaveBeenCalledTimes(2);

		subscription.unsubscribe();

		await vi.advanceTimersByTimeAsync(1000);

		expect(handler).toHaveBeenCalledTimes(2);
	});

	test('should not start second timer on second connect', async () => {
		retryQuery({
			query,
			store: storeAtom,
			timeout: 1000,
		});

		const subscription1 = ctx.subscribeTrack(storeAtom);

		await vi.advanceTimersByTimeAsync(500);

		const subscription2 = ctx.subscribeTrack(storeAtom);

		expect(handler).toHaveBeenCalledTimes(1);

		await vi.advanceTimersByTimeAsync(1000);

		expect(handler).toHaveBeenCalledTimes(2);

		subscription1.unsubscribe();
		subscription2.unsubscribe();
	});

	test('should do nothing if query throw an error', async () => {
		retryQuery({
			query,
			store: storeAtom,
			timeout: 1000,
		});

		handler.mockRejectedValueOnce(new Error('error'));

		const subscription = ctx.subscribeTrack(storeAtom);

		expect(handler).toHaveBeenCalledTimes(1);

		await vi.advanceTimersByTimeAsync(1000);

		expect(handler).toHaveBeenCalledTimes(2);

		subscription.unsubscribe();
	});

	test('should call onFail if query throw an error', async () => {
		const onFail = vi.fn();

		retryQuery({
			query,
			store: storeAtom,
			onFail,
			timeout: 1000,
		});

		handler.mockRejectedValueOnce(new Error('error'));

		const subscription = ctx.subscribeTrack(storeAtom);

		expect(handler).toHaveBeenCalledTimes(1);

		await vi.advanceTimersByTimeAsync(1000);

		expect(handler).toHaveBeenCalledTimes(2);
		expect(onFail).toHaveBeenCalled();

		subscription.unsubscribe();
	});
});
