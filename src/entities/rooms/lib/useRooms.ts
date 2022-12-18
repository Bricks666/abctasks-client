import { useQuery } from '@farfetched/react';
import { useGate } from 'effector-react';
import { roomsModel } from '../model';

export const useRooms = () => {
	useGate(roomsModel.RoomsGate);
	return useQuery(roomsModel.getRoomsQuery);
};
