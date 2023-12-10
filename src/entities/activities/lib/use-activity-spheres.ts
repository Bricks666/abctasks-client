import { useUnit } from 'effector-react';

import { activitySpheresModel } from '../model';

export const useActivitySpheres = () => {
	return useUnit(activitySpheresModel.query);
};
