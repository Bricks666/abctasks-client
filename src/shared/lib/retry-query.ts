/* eslint-disable no-await-in-loop */
import {
	Action,
	ActionParams,
	ActionPayload,
	AsyncAction,
	Atom,
	noop,
	onConnect,
	sleep
} from '@reatom/framework';

import { AnyFunction } from '../types';

export type WithRetry<T> = T & {
	readonly paramsAtom: Atom<ActionParams<T> | undefined>;
	readonly retry: Action<[after?: number | undefined], ActionPayload<T>>;
	readonly retriesAtom: Atom<number>;
};

export interface RetryQueryOptions {
	readonly store: Atom;
	readonly query: WithRetry<AsyncAction>;
	readonly timeout: number;
	readonly onFail?: AnyFunction;
}

export const retryQuery = (options: RetryQueryOptions): void => {
	const { query, store, timeout, onFail = noop, } = options;

	onConnect(store, async (ctx) => {
		while (ctx.isConnected()) {
			await ctx.schedule(() => sleep(timeout));
			await query.retry(ctx).catch(onFail);
		}
	});
};
