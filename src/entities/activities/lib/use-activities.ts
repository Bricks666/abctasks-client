import { useMemo } from 'react';

import { ActivitiesModel, activititesModel } from '../models';

export interface UseActivitiesParams {
	readonly name: string;
	readonly roomId: number;

	/**
	 * @default 50
	 */
	readonly count?: number;
}

export const useActivities = (params: UseActivitiesParams): ActivitiesModel => {
	const { roomId, count, name, } = params;

	return useMemo(() => {
		return activititesModel.create(params);
	}, [roomId, count, name]);
};
