import { useStoreMap } from 'effector-react';

import { controls } from '@/shared/configs';

export const useQueryParam = <T extends string | null = null>(
	name: string,
	defaultValue: T
): string | T => {
	return useStoreMap({
		store: controls.$query,
		fn: (query, [key]) => {
			return query[key] ?? undefined;
		},
		keys: [name],
		defaultValue,
	});
};
