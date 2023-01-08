import { useUnit } from 'effector-react';
import { roomsModel } from '../model';

export const useRooms = () => {
	return useUnit(roomsModel.query);
};
