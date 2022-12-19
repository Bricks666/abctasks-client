import { useQuery } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import { activitiesModel } from '../model';

export const useActivities = (roomId: number) => {
	useGate(activitiesModel.Gate, { roomId, });
	const query = useQuery(activitiesModel.query);
	const status = useUnit(activitiesModel.query.$status);
	return {
		...query,
		status,
	};
};
