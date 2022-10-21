import { sample } from 'effector';
import { progressApi } from '@/api';
import {
	createTaskMutation,
	removeTaskMutation,
	updateTaskMutation,
} from '../tasks';
import { getProgressFx } from './units';
import { removeGroupMutation, updateGroupMutation } from '../groups';
import { getProgressQuery } from './queries';

getProgressFx.use(progressApi.getAll);

sample({
	clock: [
		createTaskMutation.finished.success,
		updateTaskMutation.finished.success,
		removeTaskMutation.finished.success,
		updateGroupMutation.finished.success,
		removeGroupMutation.finished.success,
	],
	fn: (data) => {
		return data.params.roomId;
	},
	target: getProgressQuery.start,
});
