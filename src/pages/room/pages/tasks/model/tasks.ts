import { sample } from 'effector';
import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';
import { notificationModel } from '@/entities/notifications';
import { tasksModel } from '@/entities/tasks';
import { routes } from '@/shared/configs';
import { Notification } from '@/shared/lib';
import { loadedWithRouteState } from './page';

sample({
	clock: createTaskModel.mutation.finished.success,
	fn: () =>
		({
			message: 'Task was created successfully',
			color: 'success' as const,
		} as Notification),
	target: notificationModel.create,
});

sample({
	clock: createTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not created',
		color: 'error' as const,
	}),
	target: notificationModel.create,
});

sample({
	clock: removeTaskModel.mutation.finished.success,
	fn: () => ({
		message: 'Task was removed successfully',
		color: 'success' as const,
	}),
	target: notificationModel.create,
});

sample({
	clock: removeTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not removed',
		color: 'error' as const,
	}),
	target: notificationModel.create,
});

sample({
	clock: updateTaskModel.mutation.finished.success,
	fn: () => ({
		message: 'Task was update successfully',
		color: 'success' as const,
	}),
	target: notificationModel.create,
});

sample({
	clock: updateTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not update',
		color: 'error' as const,
	}),
	target: notificationModel.create,
});

sample({
	clock: [routes.room.tasks.opened, loadedWithRouteState],
	fn: ({ params, }) => params.id,
	target: tasksModel.query.start,
});
