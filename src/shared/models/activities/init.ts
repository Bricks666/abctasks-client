import { sample } from 'effector';
import {
	createGroupMutation,
	removeGroupMutation,
	updateGroupMutation
} from '../groups';
import {
	createTaskMutation,
	removeTaskMutation,
	updateTaskMutation
} from '../tasks';
import { getActivitiesQuery } from './queries';
import { getActivitiesFx, ActivityGate } from './units';
import { activitiesApi } from '@/api';

getActivitiesFx.use(activitiesApi.getAll);

sample({
	clock: [
		createTaskMutation.finished.success,
		updateTaskMutation.finished.success,
		removeTaskMutation.finished.success,
		createGroupMutation.finished.success,
		updateGroupMutation.finished.success,
		removeGroupMutation.finished.success
	],
	fn: ({ params: { roomId, }, }) => {
		return roomId;
	},
	target: getActivitiesQuery.start,
});

sample({
	clock: ActivityGate.open,
	fn: ({ roomId, }) => roomId,
	target: getActivitiesQuery.start,
});
