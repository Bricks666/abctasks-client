import { useStoreMap } from 'effector-react';
import { $GroupsMap } from '@/shared/models';

export const useGroup = (groupId: number) => {
	return useStoreMap($GroupsMap, (groups) => {
		return groups[groupId] ?? null;
	});
};
