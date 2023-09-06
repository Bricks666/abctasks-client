import { sample } from 'effector';

import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';

import { progressesModel } from '@/entities/progresses';

import { currentRoute, loadedWithRouteState } from './page';

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
	clock: currentRoute.closed,
	target: progressesModel.query.reset,
});

sample({
	clock: [currentRoute.opened, currentRoute.updated, loadedWithRouteState],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: progressesModel.query.start,
});
