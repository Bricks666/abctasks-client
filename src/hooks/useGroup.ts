import { useStoreMap } from 'effector-react';
import { $GroupsMap } from '@/models/groups';

export const useGroup = (groupId: number) => {
	return useStoreMap($GroupsMap, (groups) => {
		return groups[groupId] ?? null;
	});
};