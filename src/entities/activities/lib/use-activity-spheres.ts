import { useUnit } from 'effector-react';

import { activitySpheresModel } from '../model';

/**
 * @deprecated
 */
export const useActivitySpheres = () => {
	return useUnit(activitySpheresModel.query);
};
