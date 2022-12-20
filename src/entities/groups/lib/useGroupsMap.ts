import { useUnit } from 'effector-react';
import { groupsModel } from '../model';
import { useGroups } from './useGroups';

export const useGroupsMap = () => {
	const query = useGroups();
	const data = useUnit(groupsModel.$groupsMap);
	return {
		...query,
		data,
	};
};
