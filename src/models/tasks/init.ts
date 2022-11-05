import { sample } from 'effector';
import { tasksApi } from '@/api';
import {
	getTasksFx,
	getTaskFx,
	createTaskFx,
	removeTaskFx,
	updateTaskFx,
	TasksGate,
	TaskGate,
} from './units';
import {
	createTaskMutation,
	getTaskQuery,
	getTasksQuery,
	removeTaskMutation,
	updateTaskMutation,
} from './queries';

getTasksFx.use(tasksApi.getAll);
getTaskFx.use(tasksApi.getOne);
createTaskFx.use(tasksApi.create);
updateTaskFx.use(tasksApi.update);
removeTaskFx.use(tasksApi.remove);

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

sample({
	clock: TasksGate.open,
	fn: ({ roomId }) => roomId,
	target: getTasksQuery.start,
});

sample({
	clock: TaskGate.open,
	target: getTaskQuery.start,
});
