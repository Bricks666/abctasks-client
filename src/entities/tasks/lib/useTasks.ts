import { useUnit } from 'effector-react';
import { tasksModel } from '../model';

export const useTasks = () => {
	return useUnit(tasksModel.query);
};
