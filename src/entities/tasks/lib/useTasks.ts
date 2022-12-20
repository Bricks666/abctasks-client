import { useQuery } from '@farfetched/react';
import { useUnit } from 'effector-react';
import { tasksModel } from '../model';

export const useTasks = () => {
	const query = useQuery(tasksModel.query);
	const status = useUnit(tasksModel.query.$status);
	return {
		...query,
		status,
	};
};
