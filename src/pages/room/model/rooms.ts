import { sample } from 'effector';
import { addUserRoomModel } from '@/features/rooms';
import { notificationsModel } from '@/entities/notifications';
import { usersInRoomModel } from '@/entities/rooms';
import { routes } from '@/shared/configs';
import { loadedWithRouteState } from './page';

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

sample({
	clock: [routes.room.base.opened, loadedWithRouteState],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: usersInRoomModel.query.start,
});
