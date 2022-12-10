import { useStoreMap } from 'effector-react';
import { controls } from '../configs';

export const useGetParam = <T extends string | number = string>(
	paramName: string
): T | null => {
	return useStoreMap({
		store: controls.$query,
		fn: (state, [name]) => {
			return state[name];
		},
		defaultValue: null,
		keys: [paramName],
	});
};
