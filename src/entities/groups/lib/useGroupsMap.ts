import { useUnit } from 'effector-react';
import { groupsModel } from '../model';
import { useGroups } from './useGroups';

export const useGroupsMap = (roomId: number) => {
	const state = useGroups(roomId);
	const data = useUnit(groupsModel.$groupsMap);
	return {
		...state,
		data,
	};
};
