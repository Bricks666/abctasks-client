import { useStoreMap } from 'effector-react';
import { router } from '@/models/routing';

export const useGetParam = <T extends string | number = string>(
	paramName: string
): T | null => {
	return useStoreMap({
		store: router.$query,
		fn: (state, [name]) => {
			return state[name];
		},
		defaultValue: null,
		keys: [paramName],
	});
};
