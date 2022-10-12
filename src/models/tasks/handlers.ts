import { Task, TaskResponse } from './types';
import { converter } from './utils';

export const editTaskHandler = (
	tasks: Task[],
	{ task }: { task: TaskResponse }
) => {
	const validTask = converter(task);

	return tasks.map((task) => (task.id === validTask.id ? validTask : task));
};
