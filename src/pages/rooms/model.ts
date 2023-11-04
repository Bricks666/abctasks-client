import { sample } from 'effector';

import { roomsModel } from '@/entities/rooms';

import { routes } from '@/shared/configs';
import { sessionModel } from '@/shared/models';

export const currentRoute = routes.rooms.base;
export const authorizedRoute = sessionModel.chainAuthorized(currentRoute, {
	otherwise: routes.login.open,
});

sample({
	clock: authorizedRoute.opened,
	target: roomsModel.query.start,
});

sample({
	clock: authorizedRoute.closed,
	target: roomsModel.query.reset,
});
