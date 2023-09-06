import { useUnit } from 'effector-react';

import { activitiesInRoomModel } from '../model';

export const useActivitiesInRoom = () => {
	return useUnit(activitiesInRoomModel.query);
};
