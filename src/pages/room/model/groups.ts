import { sample } from 'effector';
import {
	createGroupModel,
	removeGroupModel,
	updateGroupModel
} from '@/features/groups';
import { createNotificationModel } from '@/features/notifications';
import { groupsModel } from '@/entities/groups';
import { routes } from '@/shared/configs';

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

sample({
	clock: routes.room.$isOpened,
	filter: (open) => !open,
	target: [groupsModel.reset],
});
