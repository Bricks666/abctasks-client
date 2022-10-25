import { useMemo } from 'react';
import { useQuery } from '@farfetched/react';
import {
	GroupedByStatusTasks,
	TaskStatus,
	Task,
	getTasksQuery,
} from '@/models/tasks';

const createGrouper = (status: TaskStatus) => {
	return (state: Task[]) => {
		return state.filter((task) => task.status === status);
	};
};

export const useGroupedTasks = () => {
	const { data: tasks, ...rest } = useQuery(getTasksQuery);
	console.debug(tasks);
	const data = useMemo<GroupedByStatusTasks | null>(() => {
		if (!tasks) {
			return null;
		}
		return {
			ready: createGrouper('ready')(tasks),
			done: createGrouper('done')(tasks),
			'in progress': createGrouper('in progress')(tasks),
			needReview: createGrouper('review')(tasks),
		};
	}, [tasks]);

	return {
		data,
		...rest,
	};
};
