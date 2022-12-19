import { useQuery } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import { tasksModel } from '../model';

export const useTasks = (roomId: number) => {
	useGate(tasksModel.TasksGate, { roomId, });
	const query = useQuery(tasksModel.getTasksQuery);
	const status = useUnit(tasksModel.getTasksQuery.$status);
	return {
		...query,
		status,
	};
};
