import { sample } from 'effector';
import { addUserRoomModel } from '@/features/rooms';
import { notificationsModel } from '@/entities/notifications';

sample({
	clock: addUserRoomModel.mutation.finished.success,
	fn: () => ({
		color: 'success' as const,
		message: 'User was added succesfully',
	}),
	target: notificationsModel.create,
});

sample({
	clock: addUserRoomModel.mutation.finished.failure,
	fn: () => ({
		color: 'error' as const,
		message: 'User was not added',
	}),
	target: notificationsModel.create,
});
