import { sample } from 'effector';
import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';
import { progressesModel } from '@/entities/progresses';
import { routes } from '@/shared/configs';
import { loadedWithRouteState } from './page';

sample({
	clock: [
		updateTaskModel.mutation.finished.success,
		createTaskModel.mutation.finished.success,
		removeTaskModel.mutation.finished.success
	],
	fn: ({ params, }) => ({ roomId: params.roomId, }),
	target: progressesModel.query.start,
});

sample({
	clock: routes.room.tasks.closed,
	target: progressesModel.query.reset,
});

sample({
	clock: [routes.room.tasks.opened, loadedWithRouteState],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: progressesModel.query.start,
});
