import { RouteInstance } from 'atomic-router';
import { useStoreMap } from 'effector-react';

export const useParam = <P extends object, K extends keyof P>(
	route: RouteInstance<P>,
	param: K
): P[K] => {
	return useStoreMap({
		store: route.$params,
		fn: (state, [key]) => {
			return state[key];
		},
		keys: [param],
	});
};
