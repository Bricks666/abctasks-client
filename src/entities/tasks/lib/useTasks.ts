import { useQuery } from '@farfetched/react';
import { useGate } from 'effector-react';
import { tasksModel } from '../model';

export const useTasks = (roomId: number) => {
	useGate(tasksModel.TasksGate, { roomId, });
	return useQuery(tasksModel.getTasksQuery);
};
