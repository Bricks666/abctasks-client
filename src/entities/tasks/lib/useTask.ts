import { useQuery } from '@farfetched/react';
import { useGate } from 'effector-react';
import { taskModel } from '../model';

export const useTask = (taskId: number, roomId: number) => {
	useGate(taskModel.Gate, { id: taskId, roomId, });
	return useQuery(taskModel.query);
};
