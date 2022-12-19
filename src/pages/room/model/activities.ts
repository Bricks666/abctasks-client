import { sample } from 'effector';
import {
	createGroupModel,
	removeGroupModel,
	updateGroupModel
} from '@/features/groups';
import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';
import { activitiesModel } from '@/entities/activities';

sample({
	clock: [
		createTaskModel.mutation.finished.success,
		removeTaskModel.mutation.finished.success,
		updateTaskModel.mutation.finished.success,
		createGroupModel.mutation.finished.success,
		removeGroupModel.mutation.finished.success,
		updateGroupModel.mutation.finished.success
	],
	fn: ({ params, }) => params.roomId,
	target: [activitiesModel.query.start],
});
