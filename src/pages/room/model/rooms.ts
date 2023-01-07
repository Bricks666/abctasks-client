import { redirect } from 'atomic-router';
import { sample } from 'effector';
import {
	addUserRoomModel,
	exitRoomModel,
	removeRoomModel
} from '@/features/rooms';
import { notificationModel } from '@/entities/notifications';
import { usersInRoomModel } from '@/entities/rooms';
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

const toRooms = sample({
	clock: [
		exitRoomModel.mutation.finished.success,
		removeRoomModel.mutation.finished.success
	],
	filter: ({ result, }) => Boolean(result.data),
});

toRooms.watch(console.log);

redirect({
	clock: toRooms,
	route: routes.rooms,
});
