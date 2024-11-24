import { useMemo } from 'react';

import { ActivitiesModel, activititesModel } from '../models';

export const useActivitiesModel = (roomId: number): ActivitiesModel => {
	return useMemo(() => {
		return activititesModel.create({ roomId, });
	}, [roomId]);
};
