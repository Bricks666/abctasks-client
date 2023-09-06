import * as React from 'react';

import { GroupedByStatusTasks, Task, TaskStatus } from '@/shared/api';

import { useTasks } from './useTasks';

const createGrouper = (status: TaskStatus) => {
	return (state: Task[]) => {
		return state.filter((task) => task.status === status);
	};
};

export const useGroupedTasks = () => {
	const { data: tasks, ...query } = useTasks();

	const data = React.useMemo<GroupedByStatusTasks>(() => {
		return {
			ready: createGrouper('ready')(tasks),
			done: createGrouper('done')(tasks),
			in_progress: createGrouper('in_progress')(tasks),
			needReview: createGrouper('review')(tasks),
		};
	}, [tasks]);

	return {
		data,
		...query,
	};
};
