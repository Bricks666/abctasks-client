/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable effector/no-getState */
import { allSettled, createEvent, createStore, fork, sample } from 'effector';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from 'vitest';
import {
	BASE_CLOSABLE,
	BASE_DURATION,
	BASE_MAX_COUNT,
	BASE_POSITION,
	BASE_TIMEOUT,
	BASE_VARIANT
} from './config';
import { createSnackbarStackModel } from './fabric';
import {
	CreateSnackbarOptions,
	FabricConfig,
	Snackbar,
	StaticFabricConfig
} from './types';

describe('createSnackbarStackFactory', () => {
	const baseConfig: StaticFabricConfig = {
		maxCount: BASE_MAX_COUNT,
		position: BASE_POSITION,
		timeout: BASE_TIMEOUT,
		closable: BASE_CLOSABLE,
		duration: BASE_DURATION,
		variant: BASE_VARIANT,
	};

	describe('configs', () => {
		test('base config', () => {
			const model = createSnackbarStackModel();
			expect(model.$config.getState()).toEqual(baseConfig);
		});

		test('partial config', () => {
			const model = createSnackbarStackModel({
				timeout: 15000,
				maxCount: 15,
			});
			expect(model.$config.getState()).toEqual({
				...baseConfig,
				maxCount: 15,
				timeout: 15000,
			});
		});

		test('total custom config', () => {
			const config: FabricConfig = {
				maxCount: 4,
				position: {
					horizontal: 'left',
					vertical: 'top',
				},
				timeout: 150,
				closable: false,
				variant: 'filled',
				duration: 1500,
			};
			const model = createSnackbarStackModel(config);
			expect(model.$config.getState()).toEqual(config);
		});

		test('reactive config', async () => {
			const $store = createStore(false);
			const toggle = createEvent();
			sample({
				clock: toggle,
				source: $store,
				fn: (store) => !store,
				target: $store,
			});

			const config: FabricConfig = {
				...baseConfig,
				closable: $store,
			};

			const model = createSnackbarStackModel(config);

			const scope = fork();

			expect(model.$config.getState()).toEqual({
				...baseConfig,
				closable: false,
			});

			await allSettled(toggle, { scope, });

			expect(scope.getState($store)).toBeTruthy();
			expect(scope.getState(model.$config)).toEqual({
				...baseConfig,
				closable: true,
			});
		});
	});

	describe('lifecycle', () => {
		const model = createSnackbarStackModel();
		const { maxCount, position, ...baseSnackConfig } = baseConfig;
		const baseSnack: Snackbar = {
			...baseSnackConfig,
			id: 1,
			open: true,
			message: '',
		};

		test('pass message and create with base config', async () => {
			const scope = fork();

			const params: CreateSnackbarOptions = { message: 'message', };

			await allSettled(model.create, { scope, params, });

			expect(scope.getState(model.$items)).toEqual([
				{
					...baseSnack,
					...params,
				}
			]);
			expect(scope.getState(model.$items).length).toBe(1);
		});

		test('partly override config', async () => {
			const scope = fork();

			const params: CreateSnackbarOptions = {
				message: 'message',
				timeout: 15000,
			};

			await allSettled(model.create, { scope, params, });

			expect(scope.getState(model.$items)).toEqual([
				{
					...baseSnack,
					...params,
				}
			]);
			expect(scope.getState(model.$items).length).toBe(1);
		});

		test('total override config', async () => {
			const scope = fork();

			const params: CreateSnackbarOptions = {
				message: 'message',
				timeout: 15000,
				closable: false,
				color: 'info',
				duration: 150,
				variant: 'outlined',
			};

			await allSettled(model.create, { scope, params, });

			expect(scope.getState(model.$items)).toEqual([
				{
					...baseSnack,
					...params,
				}
			]);
			expect(scope.getState(model.$items).length).toBe(1);
		});

		test('increment id after creation', async () => {
			const scope = fork();

			const params: CreateSnackbarOptions = { message: 'message', };

			await allSettled(model.create, { scope, params, });
			await allSettled(model.create, { scope, params, });

			expect(scope.getState(model.$items)).toEqual([
				{
					...baseSnack,
					...params,
					id: 1,
				},
				{
					...baseSnack,
					...params,
					id: 2,
				}
			]);
			expect(scope.getState(model.$items).length).toBe(2);
		});

		test('mark as close oldest after overflow', async () => {
			const scope = fork({
				values: [
					[
						model.$items,
						[
							{ ...baseSnack, id: 4, },
							{ ...baseSnack, id: 2, },
							{ ...baseSnack, id: 3, }
						]
					]
				],
			});

			const params: CreateSnackbarOptions = { message: 'message', };

			await allSettled(model.create, { scope, params, });

			expect(scope.getState(model.$items)[0].open).toBeFalsy();
			expect(scope.getState(model.$items).length).toBe(4);
		});

		test('mark as close after timeout expired', async () => {
			const scope = fork({
				values: [[model.$items, [{ ...baseSnack, timeout: 5000, }]]],
			});

			await allSettled(model.mounted, { scope, params: 1, });

			expect(scope.getState(model.$items)[0].open).toBeFalsy();
			expect(scope.getState(model.$items).length).toBe(1);
		});

		test('mark as close after call manually close', async () => {
			const scope = fork({
				values: [[model.$items, [{ ...baseSnack, }]]],
			});

			await allSettled(model.close, { scope, params: 1, });

			expect(scope.getState(model.$items)[0].open).toBeFalsy();
			expect(scope.getState(model.$items).length).toBe(1);
		});

		test('remove after calling unmounted', async () => {
			const scope = fork({
				values: [[model.$items, [{ ...baseSnack, }]]],
			});

			await allSettled(model.unmounted, { scope, params: 1, });

			expect(scope.getState(model.$items)).toEqual([]);
			expect(scope.getState(model.$items).length).toBe(0);
		});
	});
});
