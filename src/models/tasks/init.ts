import { sample } from 'effector';
import { tasksApi } from '@/api';
import {
	getTasksFx,
	getTaskFx,
	createTaskFx,
	removeTaskFx,
	updateTaskFx,
	TasksGate,
	TaskGate
} from './units';
import {
	createTaskMutation,
	getTaskQuery,
	getTasksQuery,
	removeTaskMutation,
	updateTaskMutation
} from './queries';
import { closeCreateTaskPopup, closeUpdateTaskPopup } from '../routing';

getTasksFx.use(tasksApi.getAll);
getTaskFx.use(tasksApi.getOne);
createTaskFx.use(tasksApi.create);
updateTaskFx.use(tasksApi.update);
removeTaskFx.use(tasksApi.remove);

sample({
	clock: createTaskMutation.finished.success,
	source: getTasksQuery.$data,
	fn: (tasks, { result: { data, }, }) => {
		return [...tasks, data];
	},
	target: getTasksQuery.$data,
});

sample({
	clock: updateTaskMutation.finished.success,
	source: getTasksQuery.$data,
	fn: (tasks, { result: { data, }, }) => {
		return tasks.map((task) => (task.id === data.id ? data : task));
	},
	target: getTasksQuery.$data,
});

sample({
	clock: removeTaskMutation.finished.success,
	source: getTasksQuery.$data,
	fn: (tasks, { params, result: { data, }, }) => {
		if (!tasks || !data) {
			return tasks;
		}
		return tasks.filter((task) => task.id !== params.id);
	},
	target: getTasksQuery.$data,
});

sample({
	clock: TasksGate.open,
	fn: ({ roomId, }) => roomId,
	target: getTasksQuery.start,
});

sample({
	clock: TaskGate.open,
	target: getTaskQuery.start,
});

sample({
	clock: updateTaskMutation.finished.success,
	target: closeUpdateTaskPopup,
});

sample({
	clock: createTaskMutation.finished.success,
	target: closeCreateTaskPopup,
});
