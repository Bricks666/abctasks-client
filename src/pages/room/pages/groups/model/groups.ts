import { sample } from 'effector';
import {
	createGroupModel,
	removeGroupModel,
	updateGroupModel
} from '@/features/groups';
import { groupsModel } from '@/entities/groups';
import { notificationsModel } from '@/entities/notifications';
import { routes } from '@/shared/configs';
import { loadedWithRouteState } from './page';

sample({
	clock: createGroupModel.mutation.finished.success,
	fn: () => ({
		message: 'Group was created successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: createGroupModel.mutation.finished.failure,
	fn: () => ({
		message: 'Group was not created',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeGroupModel.mutation.finished.success,
	fn: () => ({
		message: 'Group was removed successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeGroupModel.mutation.finished.failure,
	fn: () => ({
		message: 'Group was not removed',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateGroupModel.mutation.finished.success,
	fn: () => ({
		message: 'Group was update successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateGroupModel.mutation.finished.failure,
	fn: () => ({
		message: 'Group was not update',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: [routes.room.groups.opened, loadedWithRouteState],
	fn: ({ params, }) => params.id,
	target: groupsModel.query.start,
});
