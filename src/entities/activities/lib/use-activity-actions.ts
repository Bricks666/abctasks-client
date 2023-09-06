import { useUnit } from 'effector-react';

import { activityActionsModel } from '../model';

export const useActivityActions = () => {
	return useUnit(activityActionsModel.query);
};
