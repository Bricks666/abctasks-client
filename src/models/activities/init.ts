import { sample } from 'effector';
import { activitiesApi } from '@/api';
import { getActivitiesFx } from '.';
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
import { $RoomId } from '../rooms';

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
	source: $RoomId,
	fn: (roomId) => {
		return roomId;
	},
	target: getActivitiesQuery.start,
});
