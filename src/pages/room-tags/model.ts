import { sample } from 'effector';

import { roomModel, roomsModel } from '@/entities/rooms';
import { tagsModel } from '@/entities/tags';

import { routes } from '@/shared/configs';
import { sessionModel } from '@/shared/models';

export const currentRoute = routes.room.tags;
export const authorizedRoute = sessionModel.chainAuthorized(currentRoute, {
	otherwise: routes.login.open,
});

sample({
	clock: authorizedRoute.opened,
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: [
		tagsModel.query.start,
		roomsModel.query.start,
		roomModel.query.start
	],
});
