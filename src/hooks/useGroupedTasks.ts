import { useMemo } from 'react';
import { GroupedByStatusTasks, TaskStatus, Task } from '@/models/tasks/types';
import { useImminentlyQuery } from './useImminentlyQuery';
import { getTasksQuery } from '@/models/tasks/queries';

const createGrouper = (status: TaskStatus) => {
	return (state: Task[]) => {
		return state.filter((task) => task.status === status);
	};
};

export const useGroupedTasks = (roomId: number) => {
	const { data: tasks = [] } = useImminentlyQuery(
		getTasksQuery,
		roomId,
		roomId
	);

	return useMemo<GroupedByStatusTasks>(
		() => ({
			ready: createGrouper('ready')(tasks || []),
			done: createGrouper('done')(tasks || []),
			'in progress': createGrouper('in progress')(tasks || []),
			needReview: createGrouper('review')(tasks || []),
		}),
		[tasks]
	);
};
