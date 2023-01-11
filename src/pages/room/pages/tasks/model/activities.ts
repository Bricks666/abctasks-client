import { sample } from 'effector';
import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';
import { activitiesModel } from '@/entities/activities';
import { routes } from '@/shared/configs';
import { loadedWithRouteState } from './page';

sample({
	clock: [
		createTaskModel.mutation.finished.success,
		removeTaskModel.mutation.finished.success,
		updateTaskModel.mutation.finished.success
	],
	fn: ({ params, }) => ({ roomId: params.roomId, }),
	target: [activitiesModel.query.start],
});

sample({
	clock: [routes.room.tasks.opened, loadedWithRouteState],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: activitiesModel.query.start,
});

sample({
	clock: routes.room.tasks.closed,
	target: activitiesModel.query.reset,
});
