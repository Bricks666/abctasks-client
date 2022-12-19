import { sample } from 'effector';
import { createNotificationModel } from '@/features/notifications';
import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';

sample({
	clock: createTaskModel.createTaskMutation.finished.success,
	fn: () => ({
		content: 'Task was created successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: createTaskModel.createTaskMutation.finished.failure,
	fn: () => ({
		content: 'Task was not created',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeTaskModel.removeTaskMutation.finished.success,
	fn: () => ({
		content: 'Task was removed successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeTaskModel.removeTaskMutation.finished.failure,
	fn: () => ({
		content: 'Task was not removed',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateTaskModel.updateTaskMutation.finished.success,
	fn: () => ({
		content: 'Task was update successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateTaskModel.updateTaskMutation.finished.failure,
	fn: () => ({
		content: 'Task was not update',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});
