import { useQuery } from '@farfetched/react';
import { roomsModel } from '../model';

export const useRooms = () => {
	return useQuery(roomsModel.query);
};
