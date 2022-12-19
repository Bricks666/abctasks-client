import { useQuery } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import { tasksModel } from '../model';

export const useTasks = (roomId: number) => {
	useGate(tasksModel.Gate, { roomId, });
	const query = useQuery(tasksModel.query);
	const status = useUnit(tasksModel.query.$status);
	return {
		...query,
		status,
	};
};
