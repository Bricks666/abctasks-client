import { querySync } from 'atomic-router';
import { createEvent, sample } from 'effector';

import { activitiesFiltersModel } from '@/features/activities';

import {
	activitiesInRoomModel,
	activityActionsModel,
	activitySpheresModel
} from '@/entities/activities';
import { roomModel, roomsModel } from '@/entities/rooms';
import { usersInRoomModel } from '@/entities/users';

import { GetActivitiesInRoomParams } from '@/shared/api';
import { controls, getParams, routes } from '@/shared/configs';
import { createQueryModel } from '@/shared/lib';
import { sessionModel } from '@/shared/models';

export const currentRoute = routes.room.activities;
export const authorizedRoute = sessionModel.chainAuthorized(currentRoute, {
	otherwise: routes.login.open,
});

const $roomId = authorizedRoute.$params.map((params) => params.id);

export const page = createQueryModel<string | null>({
	name: getParams.page,
	defaultValue: null,
	route: authorizedRoute,
});

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
	clock: formApplied,
	target: page.reset,
});

sample({
	clock: [formApplied, page.$value],
	source: {
		roomId: $roomId,
		page: page.$value,
		values: $values,
	},
	fn: ({ roomId, values, page, }): GetActivitiesInRoomParams => {
		return {
			roomId,
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
	target: queries.map((query) => query.start).concat(roomModel.query.start),
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
		[getParams.userId]: fields.activistIds.$value,
		[getParams.actionId]: fields.actionIds.$value,
		[getParams.after]: fields.after.$value,
		[getParams.before]: fields.before.$value,
		[getParams.sphereId]: fields.sphereIds.$value,
	},
	clock: formApplied,
	route: authorizedRoute,
});
