import { allSettled, fork, Scope } from 'effector';
import { createMemoryHistory } from 'history';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { getParams, router } from '../configs';
import { popupsModel } from '../models';

import {
	createPopupControlModel,
	PopupControlModel
} from './create-popup-control-model';

vi.useFakeTimers();

describe('shared/lib/create-popup-control-model', () => {
	let scope: Scope;
	let model: PopupControlModel;
	const name = 'test-name';

	beforeEach(async () => {
		scope = fork();

		await allSettled(router.setHistory, {
			scope,
			params: createMemoryHistory({
				initialEntries: ['/rooms'],
			}),
		});
	});

	describe('without sync', () => {
		beforeEach(() => {
			model = createPopupControlModel({
				name,
				sync: false,
			});
		});

		test('should open popup with created name', async () => {
			const fn = vi.fn();
			const { unsubscribe, } = model.opened.subscribe(fn);

			const promise = allSettled(popupsModel.open, { scope, params: name, });

			await vi.advanceTimersByTimeAsync(250);
			await promise;

			expect(scope.getState(model.$isOpen)).toBeTruthy();
			expect(scope.getState(popupsModel.$popups)).toContain(name);
			expect(fn).toHaveBeenCalled();
			unsubscribe();
		});

		test('should close popup with created name', async () => {
			const fn = vi.fn();
			const { unsubscribe, } = model.closed.subscribe(fn);

			const promise1 = allSettled(popupsModel.open, { scope, params: name, });
			await vi.advanceTimersByTimeAsync(250);
			await promise1;

			const promise2 = allSettled(model.close, { scope, });
			await vi.advanceTimersByTimeAsync(250);
			await promise2;

			expect(scope.getState(model.$isOpen)).toBeFalsy();
			expect(scope.getState(popupsModel.$popups)).not.toContain(name);
			expect(fn).toHaveBeenCalled();
			unsubscribe();
		});
	});

	describe('with sync', () => {
		beforeEach(() => {
			model = createPopupControlModel({
				name,
			});
		});

		test('should open popup with created name', async () => {
			const fn = vi.fn();
			const { unsubscribe, } = model.opened.subscribe(fn);

			const promise = allSettled(model.open, { scope, });

			await vi.advanceTimersByTimeAsync(250);
			await promise;

			expect(scope.getState(model.$isOpen)).toBeTruthy();
			expect(scope.getState(popupsModel.$popups)).toContain(name);
			expect(scope.getState(router.$query)).toStrictEqual({
				[getParams.popup]: name,
			});
			expect(fn).toHaveBeenCalled();
			unsubscribe();
		});

		test('should close popup with created name', async () => {
			const fn = vi.fn();
			const { unsubscribe, } = model.closed.subscribe(fn);

			const promise1 = allSettled(model.open, { scope, });
			await vi.advanceTimersByTimeAsync(250);
			await promise1;

			const promise2 = allSettled(model.close, { scope, });
			await vi.advanceTimersByTimeAsync(250);
			await promise2;

			expect(scope.getState(model.$isOpen)).toBeFalsy();
			expect(scope.getState(popupsModel.$popups)).not.toContain(name);
			expect(scope.getState(router.$query)).toStrictEqual({});
			expect(fn).toHaveBeenCalled();
			unsubscribe();
		});
	});

	describe('unit shape', () => {
		beforeEach(() => {
			model = createPopupControlModel({
				name,
			});
		});

		test('should return all controls and store', () => {
			const shape = model['@@unitShape']();

			expect(shape).toStrictEqual({
				close: model.close,
				opened: model.opened,
				open: model.open,
				closed: model.closed,
				isOpen: model.$isOpen,
			});
		});
	});
});
