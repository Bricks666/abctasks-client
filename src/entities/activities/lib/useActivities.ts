import { useUnit } from 'effector-react';
import { activitiesModel } from '../model';

export const useActivities = () => {
	return useUnit(activitiesModel.query);
};
