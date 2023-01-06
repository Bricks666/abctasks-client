import { sample } from 'effector';
import { addUserRoomModel } from '@/features/rooms';
import { notificationModel } from '@/entities/notifications';
import { usersInRoomModel } from '@/entities/users';
import { routes } from '@/shared/configs';
import { loadedWithRouteParams } from './page';

sample({
	clock: addUserRoomModel.mutation.finished.success,
	fn: () => ({
		variant: 'success' as const,
		content: 'User was added succesfully',
	}),
	target: notificationModel.$last,
});

sample({
	clock: addUserRoomModel.mutation.finished.failure,
	fn: () => ({
		variant: 'error' as const,
		content: 'User was not added',
	}),
	target: notificationModel.$last,
});

sample({
	clock: [routes.room.opened, loadedWithRouteParams],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: usersInRoomModel.query.start,
});

sample({
	clock: addUserRoomModel.mutation.finished.success,
	fn: ({ result, }) => result.data,
	target: usersInRoomModel.add,
});
