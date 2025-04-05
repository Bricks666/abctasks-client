import { ActionParams, Reaction } from '@reatom/framework';
import { useCtx } from '@reatom/npm-react';
import { useEffect } from 'react';

import { AnyFunction } from '../types';

export const useReaction = <
	R extends Reaction<[callback: AnyFunction], any>,
	Callback extends ActionParams<R>[0],
>(
		reaction: R,
		callback?: Callback
	) => {
	const ctx = useCtx();

	useEffect(() => {
		if (callback) {
			return reaction(ctx, callback).unsubscribe;
		}
	}, [reaction, callback, ctx]);
};
