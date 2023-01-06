import { useUnit } from 'effector-react';
import { activitiesModel } from '../model';

export const useActivities = () => {
	const query = useUnit(activitiesModel.query);
	const status = useUnit(activitiesModel.query.$status);
	return {
		...query,
		status,
	};
};
