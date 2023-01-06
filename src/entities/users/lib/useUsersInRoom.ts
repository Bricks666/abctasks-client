import { useQuery } from '@farfetched/react';
import { usersInRoomModel } from '../model';

export const useUsersInRoom = () => {
	return useQuery(usersInRoomModel.query);
};
