import { sample } from 'effector';
import { createNotificationModel } from '@/features/notifications';
import {
	createRoomModel,
	removeRoomModel,
	updateRoomModel
} from '@/features/rooms';
import { roomsModel } from '@/entities/rooms';
import { routes } from '@/shared/configs';
import { loadedWithRouteParams } from './page';

sample({
	clock: createRoomModel.mutation.finished.success,
	fn: () => ({
		content: 'Room was created successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: createRoomModel.mutation.finished.failure,
	fn: () => ({
		content: 'Room was not created',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeRoomModel.mutation.finished.success,
	fn: () => ({
		content: 'Room was removed successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeRoomModel.mutation.finished.failure,
	fn: () => ({
		content: 'Room was not removed',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateRoomModel.mutation.finished.success,
	fn: () => ({
		content: 'Room was update successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateRoomModel.mutation.finished.failure,
	fn: () => ({
		content: 'Room was not update',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: routes.rooms.closed,
	target: roomsModel.query.reset,
});

sample({
	clock: [routes.rooms.opened, loadedWithRouteParams],
	target: roomsModel.query.start,
});
