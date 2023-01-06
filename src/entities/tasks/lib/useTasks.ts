import { useUnit } from 'effector-react';
import { tasksModel } from '../model';

export const useTasks = () => {
	const query = useUnit(tasksModel.query);
	const status = useUnit(tasksModel.query.$status);
	return {
		...query,
		status,
	};
};
