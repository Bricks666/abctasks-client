import { sample } from 'effector';

import { roomsModel } from '@/entities/rooms';
import { usersInRoomModel } from '@/entities/users';

import { routes } from '@/shared/configs';
import { sessionModel } from '@/shared/models';

export const currentRoute = routes.room.users;
export const authorizedRoute = sessionModel.chainAuthorized(currentRoute, {
	otherwise: routes.login.open,
});

sample({
	clock: authorizedRoute.opened,
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: [usersInRoomModel.query.start, roomsModel.query.start],
});
