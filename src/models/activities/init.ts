import { sample } from 'effector';
import { activitiesApi } from '@/api';
import { getActivitiesFx, activityGate } from './units';
import {
	createTaskMutation,
	removeTaskMutation,
	updateTaskMutation,
} from '../tasks';
import {
	createGroupMutation,
	removeGroupMutation,
	updateGroupMutation,
} from '../groups';
import { getActivitiesQuery } from './queries';

getActivitiesFx.use(activitiesApi.getAll);

sample({
	clock: [
		createTaskMutation.finished.success,
		updateTaskMutation.finished.success,
		removeTaskMutation.finished.success,
		createGroupMutation.finished.success,
		updateGroupMutation.finished.success,
		removeGroupMutation.finished.success,
	],
	fn: ({ params: { roomId } }) => {
		return roomId;
	},
	target: getActivitiesQuery.start,
});

sample({
	clock: activityGate.state,
	fn: ({ roomId }) => roomId,
	target: getActivitiesQuery.start,
});
