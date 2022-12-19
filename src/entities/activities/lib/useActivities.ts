import { useQuery } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import { activitiesModel } from '../model';

export const useActivities = (roomId: number) => {
	useGate(activitiesModel.ActivityGate, { roomId, });
	const query = useQuery(activitiesModel.getActivitiesQuery);
	const status = useUnit(activitiesModel.getActivitiesQuery.$status);
	return {
		...query,
		status,
	};
};
