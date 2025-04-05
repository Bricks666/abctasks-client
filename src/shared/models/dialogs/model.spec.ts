import { takeNested } from '@reatom/framework';
import { urlAtom } from '@reatom/url';
import { getDefaultInjector } from 'bunshi';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { createTestCtx, type TestCtx } from '~/test-utils';

import { DialogsMolecule } from './model';
import type { DialogsModel } from './types';

describe('shared/models/dialogs/model.ts', () => {
	const name = 'test-popup-name';
	let ctx: TestCtx;
	let model: DialogsModel;

	const createModel = () => {
		model = getDefaultInjector().get(DialogsMolecule);
	};

	beforeEach(async () => {
		vi.useFakeTimers();
		ctx = createTestCtx();

		urlAtom.go(ctx, '/', true);

		createModel();
	});

	afterEach(async () => {
		await vi.runOnlyPendingTimersAsync();
		vi.useRealTimers();
	});

	describe('without query sync', () => {
		test('should open popup', async () => {
			const promise = takeNested(ctx, model.open, name);

			await promise;

			expect(ctx.get(model.openedAtom)).toContain(name);
		});

		test('should close popup', async () => {
			const promise1 = takeNested(ctx, model.open, name);

			await promise1;

			const promise2 = takeNested(ctx, model.close, name);

			await promise2;

			expect(ctx.get(model.openedAtom)).toStrictEqual([]);
		});

		test('should do nothing if try to close non-opened popup', async () => {
			const promise1 = takeNested(ctx, model.open, name);

			await promise1;

			const promise2 = takeNested(ctx, model.close, 'another-name');

			await promise2;

			expect(ctx.get(model.openedAtom)).toStrictEqual([name]);
		});

		test('should allow open several time the same popups', async () => {
			const promise1 = takeNested(ctx, model.open, name);

			await promise1;

			const promise2 = takeNested(ctx, model.open, name);

			await promise2;

			expect(ctx.get(model.openedAtom)).toStrictEqual([name, name]);
		});

		test('should update mounted popup with 250ms delay', async () => {
			const track = ctx.subscribeTrack(model.mountedAtom);

			const promise = takeNested(ctx, model.open, name);

			expect(ctx.get(model.mountedAtom)).toStrictEqual([]);

			await vi.advanceTimersByTimeAsync(250);

			await promise;

			expect(track.lastInput()).toStrictEqual([name]);

			track.unsubscribe();
		});
	});

	describe('with query sync', () => {
		test('should close popup', async () => {
			const promise1 = takeNested(ctx, model.openSyncly, name);

			await promise1;

			const promise2 = takeNested(ctx, model.closeSyncly, name);

			await promise2;

			expect(ctx.get(model.openedAtom)).toStrictEqual([]);
			expect(ctx.get(urlAtom).searchParams.get('p')).toBe('');
		});

		test('should open popup', async () => {
			const promise = takeNested(ctx, model.openSyncly, name);

			await promise;

			expect(ctx.get(model.openedAtom)).toStrictEqual([name]);
			expect(ctx.get(urlAtom).searchParams.get('p')).toBe(name);
		});

		test('should do nothing if try to close non-opened popup', async () => {
			const promise1 = takeNested(ctx, model.openSyncly, name);

			await promise1;

			const promise2 = takeNested(ctx, model.closeSyncly, 'another-name');

			await promise2;

			expect(ctx.get(model.openedAtom)).toStrictEqual([name]);
			expect(ctx.get(urlAtom).searchParams.get('p')).toBe(name);
		});

		test('should allow open several time the same popups', async () => {
			const promise1 = takeNested(ctx, model.openSyncly, name);

			await promise1;

			const promise2 = takeNested(ctx, model.openSyncly, name);

			await promise2;

			expect(ctx.get(model.openedAtom)).toStrictEqual([name, name]);
			expect(ctx.get(urlAtom).searchParams.get('p')).toStrictEqual(
				[name, name].join(',')
			);
		});

		test('should update mounted popup with 250ms delay', async () => {
			const track = ctx.subscribeTrack(model.mountedAtom);

			const promise = takeNested(ctx, model.openSyncly, name);

			expect(track.lastInput()).toStrictEqual([]);

			await vi.advanceTimersByTimeAsync(250);

			await promise;

			expect(track.lastInput()).toStrictEqual([name]);

			track.unsubscribe();
		});
	});
});
