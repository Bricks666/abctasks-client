import { sample } from 'effector';
import {
	updateGroupModel,
	createGroupModel,
	removeGroupModel
} from '@/features/groups';
import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';
import { progressesModel } from '@/entities/progresses';

sample({
	clock: [
		updateTaskModel.mutation.finished.success,
		createTaskModel.mutation.finished.success,
		removeTaskModel.mutation.finished.success,
		updateGroupModel.mutation.finished.success,
		createGroupModel.mutation.finished.success,
		removeGroupModel.mutation.finished.success
	],
	fn: ({ params, }) => params.roomId,
	target: progressesModel.query.start,
});
