import { useMemo } from 'react';

import { roomsModel } from '../models';

export const useRooms = () => {
	return useMemo(roomsModel.create, []);
};
