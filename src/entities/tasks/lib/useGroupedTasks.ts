import * as React from 'react';
import { GroupedByStatusTasks, Task, TaskStatus } from '@/shared/api';
import { useTasks } from './useTasks';

const createGrouper = (status: TaskStatus) => {
	return (state: Task[]) => {
		return state.filter((task) => task.status === status);
	};
};

export const useGroupedTasks = (roomId: number) => {
	const { data: tasks, ...rest } = useTasks(roomId);

	const data = React.useMemo<GroupedByStatusTasks | null>(() => {
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
