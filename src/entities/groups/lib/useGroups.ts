import { useQuery } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import { groupsModel } from '../model';

export const useGroups = (roomId: number) => {
	useGate(groupsModel.Gate, { roomId, });
	const query = useQuery(groupsModel.query);
	const status = useUnit(groupsModel.query.$status);
	return {
		...query,
		status,
	};
};
