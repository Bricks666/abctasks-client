import { useUnit } from 'effector-react';
import { groupsModel } from '../model';
import { useGroups } from './useGroups';

export const useGroupsMap = (roomId: number) => {
	const query = useGroups(roomId);
	const data = useUnit(groupsModel.$groupsMap);
	return {
		...query,
		data,
	};
};
