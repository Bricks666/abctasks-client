import { useUnit } from 'effector-react';

import { usersInRoomModel } from '../model';

export const useUsersInRoom = () => {
	return useUnit(usersInRoomModel.query);
};
