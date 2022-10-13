import { Task } from './types';

export const editTaskHandler = (tasks: Task[], { task }: { task: Task }) => {
	return tasks.map((t) => (t.id === task.id ? task : t));
};
