import { sample } from 'effector';
import {
	createGroupModel,
	removeGroupModel,
	updateGroupModel
} from '@/features/groups';
import { createNotificationModel } from '@/features/notifications';
import { groupsModel } from '@/entities/groups';
import { routes } from '@/shared/configs';
import { loadedWithRouteState } from './page';

sample({
	clock: createGroupModel.mutation.finished.success,
	fn: () => ({
		content: 'Group was created successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: createGroupModel.mutation.finished.failure,
	fn: () => ({
		content: 'Group was not created',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeGroupModel.mutation.finished.success,
	fn: () => ({
		content: 'Group was removed successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeGroupModel.mutation.finished.failure,
	fn: () => ({
		content: 'Group was not removed',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateGroupModel.mutation.finished.success,
	fn: () => ({
		content: 'Group was update successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateGroupModel.mutation.finished.failure,
	fn: () => ({
		content: 'Group was not update',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: [routes.room.groups.opened, loadedWithRouteState],
	fn: ({ params, }) => params.id,
	target: groupsModel.query.start,
});
