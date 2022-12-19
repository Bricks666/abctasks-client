import { sample } from 'effector';
import { createNotificationModel } from '@/features/notifications';
import {
	createRoomModel,
	removeRoomModel,
	updateRoomModel
} from '@/features/rooms';

sample({
	clock: createRoomModel.createRoomMutation.finished.success,
	fn: () => ({
		content: 'Room was created successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: createRoomModel.createRoomMutation.finished.failure,
	fn: () => ({
		content: 'Room was not created',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeRoomModel.removeRoomMutation.finished.success,
	fn: () => ({
		content: 'Room was removed successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: removeRoomModel.removeRoomMutation.finished.failure,
	fn: () => ({
		content: 'Room was not removed',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateRoomModel.updateRoomMutation.finished.success,
	fn: () => ({
		content: 'Room was update successfully',
		variant: 'success' as const,
	}),
	target: createNotificationModel.setNotification,
});

sample({
	clock: updateRoomModel.updateRoomMutation.finished.failure,
	fn: () => ({
		content: 'Room was not update',
		variant: 'error' as const,
	}),
	target: createNotificationModel.setNotification,
});
