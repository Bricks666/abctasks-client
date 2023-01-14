import { sample } from 'effector';
import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';
import { notificationsModel } from '@/entities/notifications';

sample({
	clock: createTaskModel.mutation.finished.success,
	fn: () => ({
		message: 'Task was created successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: createTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not created',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeTaskModel.mutation.finished.success,
	fn: () => ({
		message: 'Task was removed successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not removed',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateTaskModel.mutation.finished.success,
	fn: () => ({
		message: 'Task was update successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not update',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
