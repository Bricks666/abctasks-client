import { useUnit } from 'effector-react';

import { lastActivitiesModel } from '../model';

export const useLastActivities = () => {
	return useUnit(lastActivitiesModel.query);
};
