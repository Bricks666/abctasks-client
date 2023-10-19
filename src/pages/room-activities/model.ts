import { querySync } from 'atomic-router';
import { createStore, createEvent, sample } from 'effector';

import { activitiesFiltersModel } from '@/features/activities';

import {
	activitiesInRoomModel,
	activityActionsModel,
	activitySpheresModel
} from '@/entities/activities';
import { roomsModel } from '@/entities/rooms';
import { usersInRoomModel } from '@/entities/users';

import { GetActivitiesInRoomParams } from '@/shared/api';
import { controls, getParams, routes } from '@/shared/configs';
import { sessionModel } from '@/shared/models';

export const currentRoute = routes.room.activities;
export const authorizedRoute = sessionModel.chainAuthorized(currentRoute, {
	otherwise: routes.login.open,
});

const $page = createStore<null | string>(null);
export const pageChanged = createEvent<null | number>();

const { fields, formValidated, reset, $values, } = activitiesFiltersModel.form;

const formApplied = createEvent<void>();

const queries = [
	activitiesInRoomModel.query,
	usersInRoomModel.query,
	roomsModel.query,
	activityActionsModel.query,
	activitySpheresModel.query
];
const sorting = {
	by: 'createdAt',
	type: 'desc',
} as const;

sample({
	clock: [formValidated, reset],
	target: formApplied,
});

sample({
	clock: pageChanged,
	fn: (page) => page as string | null,
	target: $page,
});

sample({
	clock: formApplied,
	fn: () => null,
	target: $page,
});

sample({
	clock: [formApplied, pageChanged],
	source: {
		params: authorizedRoute.$params,
		page: $page,
		values: $values,
	},
	fn: ({ params, values, page, }): GetActivitiesInRoomParams => {
		return {
			roomId: params.id,
			...sorting,
			...values,
			page: page ? Number(page) : 1,
		};
	},
	target: activitiesInRoomModel.query.start,
});

sample({
	clock: authorizedRoute.opened,
	fn: ({ params, query, }): GetActivitiesInRoomParams => ({
		roomId: params.id,
		activistIds: query[getParams.userId],
		actionIds: query[getParams.actionId],
		after: query[getParams.after],
		before: query[getParams.before],
		sphereIds: query[getParams.sphereId],
		count: query[getParams.count],
		page: query[getParams.page],
		...sorting,
	}),
	target: queries.map((query) => query.start),
});

sample({
	clock: authorizedRoute.closed,
	target: reset,
});

sample({
	clock: authorizedRoute.closed,
	target: queries.map((query) => query.reset),
});

querySync({
	controls,
	source: {
		[getParams.page]: $page,
	},
	route: authorizedRoute,
});

querySync({
	controls,
	source: {
		[getParams.userId]: fields.activistIds.$value,
		[getParams.actionId]: fields.actionIds.$value,
		[getParams.after]: fields.after.$value,
		[getParams.before]: fields.before.$value,
		[getParams.sphereId]: fields.sphereIds.$value,
	},
	clock: formApplied,
	route: authorizedRoute,
});
