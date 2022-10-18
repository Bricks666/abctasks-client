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
import { $RoomId } from '../rooms';

getTasksFx.use(tasksApi.getAll);
getTaskFx.use(tasksApi.getOne);
createTaskBaseFx.use(tasksApi.create);
updateTaskBaseFx.use(tasksApi.update);
removeTaskBaseFx.use(tasksApi.remove);

sample({
	clock: [
		removeTaskMutation.finished.success,
		updateTaskMutation.finished.success,
		createTaskMutation.finished.success,
	],
	source: $RoomId,
	target: getTasksQuery.start,
});
