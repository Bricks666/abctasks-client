import { useQuery } from '@farfetched/react';
import { useGate } from 'effector-react';
import { roomsModel } from '../model';

export const useRoom = (id: number) => {
	useGate(roomsModel.RoomGate, { roomId: id, });
	return useQuery(roomsModel.getRoomQuery);
};
