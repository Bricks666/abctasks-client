import { sample } from 'effector';

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
	target: tagsModel.query.start,
});
