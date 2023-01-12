import { sample } from 'effector';
import {
	createRoomModel,
	removeRoomModel,
	updateRoomModel
} from '@/features/rooms';
import { notificationsModel } from '@/entities/notifications';
import { roomsModel } from '@/entities/rooms';
import { routes } from '@/shared/configs';
import { loadedWithRouteParams } from './page';

sample({
	clock: createRoomModel.mutation.finished.success,
	fn: () => ({
		message: 'Room was created successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: createRoomModel.mutation.finished.failure,
	fn: () => ({
		message: 'Room was not created',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeRoomModel.mutation.finished.success,
	fn: () => ({
		message: 'Room was removed successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeRoomModel.mutation.finished.failure,
	fn: () => ({
		message: 'Room was not removed',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateRoomModel.mutation.finished.success,
	fn: () => ({
		message: 'Room was update successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateRoomModel.mutation.finished.failure,
	fn: () => ({
		message: 'Room was not update',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: routes.rooms.closed,
	target: roomsModel.query.reset,
});

sample({
	clock: [routes.rooms.opened, loadedWithRouteParams],
	target: roomsModel.query.start,
});
