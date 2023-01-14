import { useGate, useUnit } from 'effector-react';
import { groupModel } from '../model';

export const useGroup = (groupId: number, roomId: number) => {
	useGate(groupModel.Gate, { id: groupId, roomId, });
	return useUnit(groupModel.query);
};
