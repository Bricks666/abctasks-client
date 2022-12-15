import { sample } from 'effector';
import {
	createGroupModel,
	removeGroupModel,
	updateGroupModel
} from '@/features/groups';
import { activitiesApi } from '@/shared/api';
import {
	createTaskMutation,
	removeTaskMutation,
	updateTaskMutation
} from '../tasks';
import { getActivitiesQuery } from './queries';
import { getActivitiesFx, ActivityGate } from './units';

getActivitiesFx.use(activitiesApi.getAll);

sample({
	clock: [
		createTaskMutation.finished.success,
		updateTaskMutation.finished.success,
		removeTaskMutation.finished.success,
		createGroupModel.createGroupMutation.finished.success,
		updateGroupModel.updateGroupMutation.finished.success,
		removeGroupModel.removeGroupMutation.finished.success
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
