import { sample } from 'effector';
import { createNotificationModel } from '@/features/notifications';
import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';
import { tasksModel } from '@/entities/tasks';
import { routes } from '@/shared/configs';
import { loadedWithRouteParams } from './page';

sample({
	clock: createTaskModel.mutation.finished.success,
	fn: () => ({
		content: 'Task was created successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: createTaskModel.mutation.finished.failure,
	fn: () => ({
		content: 'Task was not created',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeTaskModel.mutation.finished.success,
	fn: () => ({
		content: 'Task was removed successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeTaskModel.mutation.finished.failure,
	fn: () => ({
		content: 'Task was not removed',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateTaskModel.mutation.finished.success,
	fn: () => ({
		content: 'Task was update successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateTaskModel.mutation.finished.failure,
	fn: () => ({
		content: 'Task was not update',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: [routes.room.opened, loadedWithRouteParams],
	fn: ({ params, }) => params.id,
	target: tasksModel.query.start,
});
