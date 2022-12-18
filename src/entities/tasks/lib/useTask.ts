import { useQuery } from '@farfetched/react';
import { useGate } from 'effector-react';
import { tasksModel } from '../model';

export const useTask = (taskId: number, roomId: number) => {
	useGate(tasksModel.TaskGate, { id: taskId, roomId, });
	return useQuery(tasksModel.getTaskQuery);
};
