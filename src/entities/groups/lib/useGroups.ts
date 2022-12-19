import { useQuery } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import { groupsModel } from '../model';

export const useGroups = (roomId: number) => {
	useGate(groupsModel.GroupsGate, { roomId, });
	const query = useQuery(groupsModel.getGroupsQuery);
	const status = useUnit(groupsModel.getGroupsQuery.$status);
	return {
		...query,
		status,
	};
};
