import { sample } from 'effector';
import {
	createGroupModel,
	removeGroupModel,
	updateGroupModel
} from '@/features/groups';
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

sample({
	clock: createGroupModel.createGroupMutation.finished.success,
	fn: () => ({
		content: 'Group was created successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: createGroupModel.createGroupMutation.finished.failure,
	fn: () => ({
		content: 'Group was not created',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeGroupModel.removeGroupMutation.finished.success,
	fn: () => ({
		content: 'Group was removed successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeGroupModel.removeGroupMutation.finished.failure,
	fn: () => ({
		content: 'Group was not removed',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateGroupModel.updateGroupMutation.finished.success,
	fn: () => ({
		content: 'Group was update successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateGroupModel.updateGroupMutation.finished.failure,
	fn: () => ({
		content: 'Group was not update',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});
