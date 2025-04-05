import { takeNested } from '@reatom/framework';
import { urlAtom } from '@reatom/url';
import { getDefaultInjector } from 'bunshi';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { createTestCtx, type TestCtx } from '~/test-utils';

import { bindDialog } from './lib';
import { DialogsMolecule } from './model';
import type { BoundDialogModel } from './types';

describe('shared/models/dialogs/lib.ts', () => {
	let ctx: TestCtx;
	let model: BoundDialogModel;
	const name = 'test-name';

	beforeEach(async () => {
		vi.useFakeTimers();

		ctx = createTestCtx();

		urlAtom.go(ctx, '/', true);
	});

	afterEach(async () => {
		await vi.runOnlyPendingTimersAsync();
		vi.useRealTimers();
	});

	describe('without sync', () => {
		const createModel = () => {
			model = getDefaultInjector().get(bindDialog(name, false));
		};

		beforeEach(() => {
			createModel();
		});

		test('should open popup with created name', async () => {
			const promise = takeNested(ctx, model.open);

			await vi.advanceTimersByTimeAsync(250);
			await promise;

			expect(ctx.get(model.openedAtom)).toBeTruthy();
			expect(
				ctx.get(getDefaultInjector().get(DialogsMolecule).openedAtom)
			).toContain(name);
		});

		test('should close popup with created name', async () => {
			const promise1 = takeNested(ctx, model.open);
			await vi.advanceTimersByTimeAsync(250);
			await promise1;

			const promise2 = takeNested(ctx, model.close);
			await vi.advanceTimersByTimeAsync(250);
			await promise2;

			expect(ctx.get(model.openedAtom)).toBeFalsy();
			expect(
				ctx.get(getDefaultInjector().get(DialogsMolecule).openedAtom)
			).not.toContain(name);
		});
	});

	describe('with sync', () => {
		beforeEach(() => {
			model = getDefaultInjector().get(bindDialog(name));
		});

		test('should open popup with created name', async () => {
			const promise = takeNested(ctx, model.open);

			await vi.advanceTimersByTimeAsync(250);
			await promise;

			expect(ctx.get(model.openedAtom)).toBeTruthy();
			expect(
				ctx.get(getDefaultInjector().get(DialogsMolecule).openedAtom)
			).toContain(name);
			expect(ctx.get(urlAtom).searchParams.get('p')).toStrictEqual(name);
		});

		test('should close popup with created name', async () => {
			const promise1 = takeNested(ctx, model.open);
			await vi.advanceTimersByTimeAsync(250);
			await promise1;

			const promise2 = takeNested(ctx, model.close);
			await vi.advanceTimersByTimeAsync(250);
			await promise2;

			expect(ctx.get(model.openedAtom)).toBeFalsy();
			expect(
				ctx.get(getDefaultInjector().get(DialogsMolecule).openedAtom)
			).not.toContain(name);
			expect(ctx.get(urlAtom).searchParams.get('p')).toStrictEqual('');
		});
	});
});
