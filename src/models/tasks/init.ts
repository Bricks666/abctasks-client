import { sample } from 'effector';
import {
	getTasksFx,
	getTaskFx,
	createTaskBaseFx,
	removeTaskBaseFx,
	updateTaskBaseFx,
} from './units';
import { tasksApi } from '@/api';
import {
	createTaskMutation,
	getTasksQuery,
	removeTaskMutation,
	updateTaskMutation,
} from './queries';

getTasksFx.use(tasksApi.getAll);
getTaskFx.use(tasksApi.getOne);
createTaskBaseFx.use(tasksApi.create);
updateTaskBaseFx.use(tasksApi.update);
removeTaskBaseFx.use(tasksApi.remove);

sample({
	clock: createTaskMutation.finished.success,
	source: getTasksQuery.$data,
	fn: (tasks, { data: { data } }) => {
		if (!tasks) {
			return null;
		}
		return [...tasks, data];
	},
	target: getTasksQuery.$data,
});

sample({
	clock: updateTaskMutation.finished.success,
	source: getTasksQuery.$data,
	fn: (tasks, { data: { data } }) => {
		if (!tasks) {
			return null;
		}
		return tasks.map((task) => (task.id === data.id ? data : task));
	},
	target: getTasksQuery.$data,
});

sample({
	clock: removeTaskMutation.finished.success,
	source: getTasksQuery.$data,
	fn: (tasks, { params, data: { data } }) => {
		if (!tasks || !data) {
			return tasks;
		}
		return tasks.filter((task) => task.id !== params.id);
	},
	target: getTasksQuery.$data,
});
