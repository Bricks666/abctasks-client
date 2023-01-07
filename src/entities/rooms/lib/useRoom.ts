import { useUnit, useGate } from 'effector-react';
import { roomModel } from '../model';

export const useRoom = (id: number) => {
	/*
  Может стоит делать выборку из всех комнат?
  */
	useGate(roomModel.Gate, { roomId: id, });
	return useUnit(roomModel.query);
};
