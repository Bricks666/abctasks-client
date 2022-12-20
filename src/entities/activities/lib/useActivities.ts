import { useQuery } from '@farfetched/react';
import { useUnit } from 'effector-react';
import { activitiesModel } from '../model';

export const useActivities = () => {
	const query = useQuery(activitiesModel.query);
	const status = useUnit(activitiesModel.query.$status);
	return {
		...query,
		status,
	};
};
