import { useStoreMap } from 'effector-react';
import { groupsModel } from '../model';

export const useGroup = (groupId: number) => {
	return useStoreMap({
		store: groupsModel.$groupsMap,
		fn: (groups, [groupId]) => groups[groupId],
		keys: [groupId],
		defaultValue: null,
	});
};
