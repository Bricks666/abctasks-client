import { useUnit, useGate } from 'effector-react';

import { roomModel } from '../model';

export const useRoom = (roomId: number) => {
	/*
  Может стоит делать выборку из всех комнат?
  */
	useGate(roomModel.Gate, { roomId, });
	return useUnit(roomModel.query);
};
