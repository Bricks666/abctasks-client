import { sample } from 'effector';
import {
	createTaskFx,
	removeTaskFx,
	updateTaskFx,
	getTasksFx,
	getTaskFx,
} from './units';
import { tasksApi } from '@/api';
import {
	createTaskMutation,
	getTasksQuery,
	removeTaskMutation,
	updateTaskMutation,
} from './queries';
import { $RoomId } from '../rooms';

getTasksFx.use(tasksApi.getAll);
getTaskFx.use(tasksApi.getOne);
createTaskFx.use(tasksApi.create);
updateTaskFx.use(tasksApi.update);
removeTaskFx.use(tasksApi.remove);

sample({
	clock: [
		removeTaskMutation.finished.success,
		updateTaskMutation.finished.success,
		createTaskMutation.finished.success,
	],
	source: $RoomId,
	target: getTasksQuery.start,
});

sample({
	clock: getTasksQuery.finished.success,
	fn: (data) => data.params,
	target: $RoomId,
});
