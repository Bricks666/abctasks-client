import { useUnit } from 'effector-react';
import { groupsModel } from '../model';

export const useGroups = () => {
	const query = useUnit(groupsModel.query);
	const status = useUnit(groupsModel.query.$status);
	return {
		...query,
		status,
	};
};
