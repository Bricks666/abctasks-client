import { sample } from 'effector';

import { roomModel, roomsModel } from '@/entities/rooms';

import { GetActivitiesInRoomParams } from '@/shared/api';
import { SEARCH_PARAMS_NAMES } from '@/shared/configs';
import { sessionModel } from '@/shared/models';

const routes = {};

export const currentRoute = routes.room.activities;
export const authorizedRoute = sessionModel.chainAuthorized(currentRoute, {
	otherwise: routes.login.open,
});

const queries = [roomsModel.query];
const sorting = {
	by: 'createdAt',
	type: 'desc',
} as const;

sample({
	clock: authorizedRoute.opened,
	fn: ({ params, query, }): GetActivitiesInRoomParams => ({
		roomId: params.id,
		activistIds: query[SEARCH_PARAMS_NAMES.userId],
		actionIds: query[SEARCH_PARAMS_NAMES.actionId],
		after: query[SEARCH_PARAMS_NAMES.after],
		before: query[SEARCH_PARAMS_NAMES.before],
		sphereIds: query[SEARCH_PARAMS_NAMES.sphereId],
		count: query[SEARCH_PARAMS_NAMES.count],
		page: query[SEARCH_PARAMS_NAMES.page],
		...sorting,
	}),
	target: queries.map((query) => query.start).concat(roomModel.query.start),
});

sample({
	clock: authorizedRoute.closed,
	target: queries.map((query) => query.reset),
});

// @todo move to filters settings
// querySync({
// 	controls,
// 	source: {
// 		[SEARCH_PARAMS_NAMES.userId]: fields.activistIds.$value,
// 		[SEARCH_PARAMS_NAMES.actionId]: fields.actionIds.$value,
// 		[SEARCH_PARAMS_NAMES.after]: fields.after.$value,
// 		[SEARCH_PARAMS_NAMES.before]: fields.before.$value,
// 		[SEARCH_PARAMS_NAMES.sphereId]: fields.sphereIds.$value,
// 	},
// 	clock: formApplied,
// 	route: authorizedRoute,
// });
