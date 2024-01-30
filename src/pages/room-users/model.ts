import { sample } from 'effector';

import { invitationsModel } from '@/entities/invitations';
import { roomModel, roomsModel } from '@/entities/rooms';
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
	target: [
		usersInRoomModel.query.start,
		roomsModel.query.start,
		invitationsModel.query.start,
		roomModel.query.start
	],
});

sample({
	clock: authorizedRoute.closed,
	target: [
		usersInRoomModel.query.reset,
		roomsModel.query.reset,
		invitationsModel.query.reset
	],
});
