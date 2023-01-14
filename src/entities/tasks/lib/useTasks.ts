import { useUnit } from 'effector-react';
import { tasksInRoomModel } from '../model';

export const useTasks = () => {
	return useUnit(tasksInRoomModel.query);
};
