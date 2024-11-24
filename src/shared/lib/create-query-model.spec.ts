import { createRoute } from 'atomic-router';
import { createEvent } from 'effector';
import { beforeEach, describe, expect, test } from 'vitest';

import { router } from '@/shared/configs';

import { QueryModel, createQueryModel } from './create-query-model';

import { Scope, useTestRouter, fork, allSettled } from '~/test-utils';

describe('shared/lib/create-query-model', () => {
	const name = 'test';
	const defaultValue = 'default';
	const value = 'another-value';
	let queryModel: QueryModel<string>;
	let scope: Scope;

	beforeEach(async () => {
		scope = fork();

		await useTestRouter({ scope, router, });
	});

	describe('simple variant', () => {
		beforeEach(() => {
			queryModel = createQueryModel({
				name,
				defaultValue,
			});
		});

		test('should set new value on set action call', async () => {
			await allSettled(queryModel.set, { scope, params: value, });

			expect(scope.getState(router.$query)).toStrictEqual({
				[name]: value,
			});
			expect(scope.getState(queryModel.$value)).toBe(value);
		});

		test('should reset value on reset action call', async () => {
			await allSettled(queryModel.set, { scope, params: value, });
			await allSettled(queryModel.reset, { scope, });

			expect(scope.getState(router.$query)).toStrictEqual({
				[name]: defaultValue,
			});
			expect(scope.getState(queryModel.$value)).toBe(defaultValue);
		});

		test('should correctly indicate empty state', async () => {
			await allSettled(queryModel.set, {
				scope,
				params: defaultValue,
			});
			expect(scope.getState(queryModel.$isEmpty)).toBeTruthy();

			await allSettled(queryModel.set, { scope, params: value, });
			expect(scope.getState(queryModel.$isEmpty)).toBeFalsy();
		});

		test('should clear empty value from query', async () => {
			await allSettled(queryModel.set, {
				scope,
				params: '',
			});
			expect(scope.getState(router.$query)).toStrictEqual({});
		});

		test('should not rewrite others queries', async () => {
			const baseQueries = {
				page: 123,
			};

			await allSettled(router.$query, {
				scope,
				params: baseQueries,
			});

			await allSettled(queryModel.set, {
				scope,
				params: value,
			});
			expect(scope.getState(router.$query)).toStrictEqual({
				page: '123',
				[name]: value,
			});
		});
	});

	describe('with specific route', () => {
		const route = createRoute();

		beforeEach(() => {
			queryModel = createQueryModel({
				name,
				defaultValue,
				route,
			});
		});

		test('should sync value if passed route is opened', async () => {
			await allSettled(queryModel.set, { scope, params: value, });

			expect(scope.getState(queryModel.$value)).toBe(value);
			expect(scope.getState(router.$query)).not.toStrictEqual({
				[name]: value,
			});

			await allSettled(route.open, { scope, });

			await allSettled(queryModel.reset, { scope, });

			expect(scope.getState(queryModel.$value)).toBe(defaultValue);
			expect(scope.getState(router.$query)).toStrictEqual({
				[name]: defaultValue,
			});
		});

		test('should not sync value if passed route is closed', async () => {
			expect(scope.getState(queryModel.$value)).toBe(defaultValue);
			expect(scope.getState(router.$query)).not.toStrictEqual({
				[name]: defaultValue,
			});

			await allSettled(route.closed, { scope, });

			expect(scope.getState(queryModel.$value)).toBe(defaultValue);
			expect(scope.getState(router.$query)).not.toStrictEqual({
				[name]: defaultValue,
			});
		});
	});

	describe('with clock method', () => {
		const clock = createEvent();

		beforeEach(() => {
			queryModel = createQueryModel({
				name,
				defaultValue,
				clock,
			});
		});

		test('should sync value on clock call', async () => {
			expect(scope.getState(queryModel.$value)).toBe(defaultValue);
			expect(scope.getState(router.$query)).not.toStrictEqual({
				[name]: defaultValue,
			});

			await allSettled(clock, { scope, });

			expect(scope.getState(queryModel.$value)).toBe(defaultValue);
			expect(scope.getState(router.$query)).toStrictEqual({
				[name]: defaultValue,
			});
		});
	});

	describe('with route and clock method', () => {
		const clock = createEvent();
		const route = createRoute();

		beforeEach(() => {
			queryModel = createQueryModel({
				name,
				defaultValue,
				clock,
				route,
			});
		});

		test('should sync method on clock call if route is opened', async () => {
			expect(scope.getState(queryModel.$value)).toBe(defaultValue);
			expect(scope.getState(router.$query)).not.toStrictEqual({
				[name]: defaultValue,
			});

			await allSettled(route.open, { scope, });
			await allSettled(clock, { scope, });

			expect(scope.getState(queryModel.$value)).toBe(defaultValue);
			expect(scope.getState(router.$query)).toStrictEqual({
				[name]: defaultValue,
			});
		});

		test('should not sync method on clock call if route is closed', async () => {
			expect(scope.getState(queryModel.$value)).toBe(defaultValue);
			expect(scope.getState(router.$query)).not.toStrictEqual({
				[name]: defaultValue,
			});

			await allSettled(clock, { scope, });

			expect(scope.getState(queryModel.$value)).toBe(defaultValue);
			expect(scope.getState(router.$query)).not.toStrictEqual({
				[name]: defaultValue,
			});
		});
	});
});
