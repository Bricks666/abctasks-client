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
import { routes } from '@/shared/configs';
import { loadedWithRouteParams } from './page';

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

sample({
	clock: routes.room.closed,
	target: activitiesModel.query.reset,
});

sample({
	clock: [routes.room.opened, loadedWithRouteParams],
	fn: ({ params, }) => params.id,
	target: activitiesModel.query.start,
});
