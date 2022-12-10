import { sample } from 'effector';
import { progressApi } from '@/shared/api';
import { removeGroupMutation, updateGroupMutation } from '../groups';
import {
	createTaskMutation,
	removeTaskMutation,
	updateTaskMutation
} from '../tasks';
import { getProgressQuery } from './queries';
import { getProgressFx, ProgressGate } from './units';

getProgressFx.use(progressApi.getAll);

sample({
	clock: [
		createTaskMutation.finished.success,
		updateTaskMutation.finished.success,
		removeTaskMutation.finished.success,
		updateGroupMutation.finished.success,
		removeGroupMutation.finished.success
	],
	fn: ({ params: { roomId, }, }) => {
		return roomId;
	},
	target: getProgressQuery.start,
});

sample({
	clock: ProgressGate.open,
	fn: ({ roomId, }) => roomId,
	target: getProgressQuery.start,
});
