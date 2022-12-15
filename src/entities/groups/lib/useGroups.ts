import { useQuery } from '@farfetched/react';
import { useGate } from 'effector-react';
import { groupsModel } from '../model';

export const useGroups = (roomId: number) => {
	useGate(groupsModel.GroupsGate, { roomId, });
	return useQuery(groupsModel.getGroupsQuery);
};
