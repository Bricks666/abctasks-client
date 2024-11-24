import { noop } from '@reatom/framework';
import { describe, expect, test, vi } from 'vitest';

import { AnyFunction, VoidFunction } from '../types';

import {
	createSingletonFactory,
	CreateSingletonFactoryOptions
} from './create-singleton-factory';

describe('src/shared/lib/create-singleton-factory', () => {
	const params = {
		param1: 'Hello',
		param2: 'world',
	};
	const factory = (params: any) => ({ params, name: 'original', });
	const anotherFactory = (params: any) => ({ params, name: 'another', });

	const create = (
		factory: AnyFunction,
		options?: CreateSingletonFactoryOptions<any[], any>
	) => {
		return createSingletonFactory(factory, options);
	};

	describe('base usage', () => {
		test('should return cached value', () => {
			const cached = create(factory);

			const result = cached(params);

			expect(result).toStrictEqual({
				params,
				name: 'original',
			});
		});

		test('should cache result returned with factory', () => {
			const cached = create(factory);

			const result = cached(params);

			expect(result).toBe(cached(params));
		});

		test('should return different values for different factories', () => {
			const cached1 = create(factory);
			const cached2 = create(anotherFactory);

			const result1 = cached1(params);
			const result2 = cached2(params);

			expect(result1).not.toBe(result2);
		});
	});

	describe('custom key', () => {
		test('should use passed constant key', () => {
			const cached = create(factory, {
				key: 'test',
			});

			const result = cached(params);

			expect(result).toBe(cached(params));
			expect(result).not.toBe(create(factory)(params));
		});

		test('should use passed function to create key from params', () => {
			const cached = create(factory, {
				key: (params) => params.param1,
			});

			const result1 = cached(params);
			const result2 = cached({ param1: 'world', });

			expect(result1).toBe(cached(params));
			expect(result1).not.toBe(result2);
			expect(result1).not.toBe(create(factory)(params));
		});
	});

	describe('hooks', () => {
		test('should stale value on callback of `staleOn` call', () => {
			let cb: VoidFunction = noop;

			const cached = create(factory, {
				hooks: {
					staleOn: (_, callback) => {
						cb = callback;
					},
				},
			});

			const result1 = cached(params);

			cb();

			const result2 = cached(params);

			expect(result1).not.toBe(result2);
		});

		test('should setup stale hook only once for each result', () => {
			const staleOn = vi.fn();

			const cached = create(factory, {
				hooks: {
					staleOn,
				},
			});

			cached(params);
			cached(params);

			expect(staleOn).toHaveBeenCalledTimes(1);
		});

		test('should write value on callback of `cacheOn` call', () => {
			let cb: VoidFunction = noop;

			const cached = create(factory, {
				hooks: {
					cacheOn: (_, callback) => {
						cb = callback;
					},
				},
			});

			const result1 = cached(params);
			const result2 = cached(params);

			cb();

			const result3 = cached(params);

			expect(result1).not.toBe(result2);
			expect(result2).toBe(result3);
		});
	});

	describe('cache', () => {
		test('should allows to pass custom cache', () => {
			const cache = {
				read: vi.fn(),
				write: vi.fn(),
				clear: vi.fn(),
			};

			const cached = create(factory, {
				cache,
			});

			const result1 = cached(params);

			expect(cache.write).toHaveBeenCalledWith('factory', result1);

			cache.read.mockReturnValue(result1);

			cached(params);

			expect(cache.read).toHaveBeenCalledWith('factory');
			expect(cache.write).toHaveBeenCalledTimes(1);
		});
	});
});
