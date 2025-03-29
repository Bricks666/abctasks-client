import { noop } from '@reatom/framework';

import { AnyFunction, VoidFunction } from '../types';

export type CacheKey = string;
export type GetCacheKey<Args extends Array<any>> = (...args: Args) => CacheKey;

export interface Cache<Value> {
	readonly read: (key: string) => Value | null;
	readonly write: (key: string, value: Value) => void;
	readonly clear: (key: string) => void;
}

interface SingletonFactoryHooks<Result> {
	readonly cacheOn?: (result: Result, callback: VoidFunction) => unknown;
	readonly staleOn?: (result: Result, callback: VoidFunction) => unknown;
}

export interface CreateSingletonFactoryOptions<
	Args extends Array<any>,
	Result,
> {
	readonly key?: CacheKey | GetCacheKey<Args>;
	readonly cache?: Cache<Result>;
	readonly hooks?: SingletonFactoryHooks<Result>;
}

export type CachedCreator<Args extends Array<any>, Result> = (
	...args: Args
) => Result;

/**
 * Helper-function to create in-memory cache of singletons.
 */
const createInMemoryCache = <Result>(): Cache<Result> => {
	// eslint-disable-next-line no-underscore-dangle
	const _cache = new Map<string, Result>();

	return {
		read(key) {
			return _cache.get(key) || null;
		},
		write(key, value) {
			_cache.set(key, value);
		},
		clear(key) {
			_cache.delete(key);
		},
	};
};

const defaultCacheOn: SingletonFactoryHooks<any>['cacheOn'] = (_, cache) =>
	cache();
const defaultStaleOn: SingletonFactoryHooks<any>['staleOn'] = noop;

/**
 * Function to make from a simple factory a factory of singletons.
 * Factory can be configured to create like only one singleton for whole app,
 * as and several singletons for specific context (keep only one instance of result for each context)
 *
 * @remarks
 * See examples in test cases
 *
 * @deprecated Use {@link bunshi} instead
 */
export const createSingletonFactory = <
	Factory extends AnyFunction,
	Args extends Parameters<Factory> = Parameters<Factory>,
	Result extends ReturnType<Factory> = ReturnType<Factory>,
>(
		factory: Factory,
		options: CreateSingletonFactoryOptions<Args, Result> = {}
	): Factory => {
	const {
		key = factory.name,
		cache = createInMemoryCache(),
		hooks = {},
	} = options;
	const { cacheOn = defaultCacheOn, staleOn = defaultStaleOn, } = hooks;

	const getKey: GetCacheKey<Args> = typeof key === 'string' ? () => key : key;

	return ((...args: Args): Result => {
		const key = getKey(...args);

		let result = cache.read(key);

		if (result) {
			return result;
		}

		result = factory(...args);

		cacheOn(result!, () => cache.write(key, result!));

		const clear = () => cache.clear(key);

		staleOn(result!, clear);

		return result as Result;
	}) as Factory;
};
