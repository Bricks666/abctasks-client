import { useStoreMap } from 'effector-react';
import { router } from '@/routes';

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
