import { useQuery } from '@farfetched/react';
import { useGate } from 'effector-react';
import { activitiesModel } from '../model';

export const useActivities = (roomId: number) => {
	useGate(activitiesModel.ActivityGate, { roomId, });
	return useQuery(activitiesModel.getActivitiesQuery);
};
