import { RouteInstance } from 'atomic-router';
import { useStoreMap } from 'effector-react';

export const useParam = <P extends object>(
	route: RouteInstance<P>,
	param: keyof P
): P[keyof P] => {
	return useStoreMap({
		store: route.$params,
		fn: (state, [key]) => {
			return state[key];
		},
		keys: [param],
	});
};
