import { useMemo } from 'react';
import {
	GroupedByStatusTasksStore,
	TaskStatus,
	TaskStructure,
} from '@/models/Tasks/types';
import { useTasks } from './useTasks';

const createGrouper = (status: TaskStatus) => {
	return (state: TaskStructure[]) => {
		return state.filter((task) => task.status === status);
	};
};

export const useGroupedTasks = () => {
	const tasks = useTasks();

	return useMemo<GroupedByStatusTasksStore>(
		() => ({
			ready: createGrouper(TaskStatus.READY)(tasks),
			done: createGrouper(TaskStatus.DONE)(tasks),
			inProgress: createGrouper(TaskStatus.IN_PROGRESS)(tasks),
			needReview: createGrouper(TaskStatus.REVIEW)(tasks),
		}),
		[tasks]
	);
};
