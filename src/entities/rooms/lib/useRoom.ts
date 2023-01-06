import { useUnit , useGate } from 'effector-react';
import { roomModel } from '../model';

export const useRoom = (id: number) => {
	useGate(roomModel.Gate, { roomId: id, });
	return useUnit(roomModel.query);
};
