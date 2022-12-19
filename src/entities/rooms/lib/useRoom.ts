import { useQuery } from '@farfetched/react';
import { useGate } from 'effector-react';
import { roomModel } from '../model';

export const useRoom = (id: number) => {
	useGate(roomModel.Gate, { roomId: id, });
	return useQuery(roomModel.query);
};
