import { cache, createQuery, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { RouteQuery, querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';

import { dragTaskModel } from '@/widgets/tasks';

import {
	createTaskModel,
	removeTaskModel,
	tasksFiltersModel,
	updateTaskModel
} from '@/features/tasks';

import { progressesModel } from '@/entities/progresses';
import { roomModel, roomsModel } from '@/entities/rooms';
import { tagsModel } from '@/entities/tags';
import { tasksInRoomModel } from '@/entities/tasks';
import { usersInRoomModel } from '@/entities/users';

import {
	ActivityDto,
	UpdateTaskParams,
	activitiesApi,
	activity
} from '@/shared/api';
import { controls, SEARCH_PARAMS_NAMES, routes } from '@/shared/configs';
import { extractData } from '@/shared/lib';
import { sessionModel } from '@/shared/models';
import {
	InRoomParams,
	StandardResponse,
	PaginationResponse,
	getStandardResponse,
	getPaginationResponse
} from '@/shared/types';

export const currentRoute = routes.room.tasks;
export const authorizedRoute = sessionModel.chainAuthorized(currentRoute, {
	otherwise: routes.login.open,
});
const { formValidated, reset, fields, } = tasksFiltersModel.form;

const activitiesDomain = createDomain();
const handlerFx = activitiesDomain.effect<
	InRoomParams,
	StandardResponse<PaginationResponse<ActivityDto>>
>(({ roomId, }) =>
	activitiesApi.getAll({ roomId, count: 6, by: 'createdAt', type: 'desc', })
);
const $roomId = authorizedRoute.$params.map((params) => params.id);

export const query = createQuery<
	InRoomParams,
	StandardResponse<PaginationResponse<ActivityDto>>,
	Error,
	StandardResponse<PaginationResponse<ActivityDto>>,
	PaginationResponse<ActivityDto>
>({
	initialData: { items: [], totalCount: 0, limit: 5, },
	effect: handlerFx,
	contract: runtypeContract(
		getStandardResponse(getPaginationResponse(activity))
	),
	mapData: extractData,
});

const queries = [
	tasksInRoomModel.query,
	tagsModel.query,
	roomsModel.query,
	usersInRoomModel.query,
	progressesModel.query,
	query
];

const mapQuery = (query: RouteQuery) => {
	return {
		authorIds: query[SEARCH_PARAMS_NAMES.userId],
		tagIds: query[SEARCH_PARAMS_NAMES.userId],
		before: query[SEARCH_PARAMS_NAMES.before],
		after: query[SEARCH_PARAMS_NAMES.after],
	};
};

cache(query);

sample({
	clock: [$roomId, authorizedRoute.opened],
	source: { query: authorizedRoute.$query, roomId: $roomId, },
	fn: ({ query, roomId, }) => ({
		roomId: roomId as number,
		...mapQuery(query),
	}),
	target: queries.map((query) => query.start).concat(roomModel.query.start),
});

querySync({
	controls,
	source: {
		[SEARCH_PARAMS_NAMES.userId]: fields.authorIds.$value,
		[SEARCH_PARAMS_NAMES.tagId]: fields.tagIds.$value,
		[SEARCH_PARAMS_NAMES.after]: fields.after.$value,
		[SEARCH_PARAMS_NAMES.before]: fields.before.$value,
	},
	clock: [formValidated, reset],
	route: authorizedRoute,
});

sample({
	clock: [formValidated, reset],
	source: authorizedRoute.$params,
	filter: authorizedRoute.$isOpened,
	fn: ({ id, }, values) => ({ roomId: id, ...values, }),
	target: tasksInRoomModel.query.start,
});

sample({
	clock: authorizedRoute.closed,
	target: queries.map((query) => query.reset).concat(reset),
});

sample({
	clock: dragTaskModel.dropped,
	source: { id: dragTaskModel.$id, roomId: $roomId, },
	fn: ({ id, roomId, }, evt) => {
		const { status, } = evt.currentTarget.dataset;
		return {
			id,
			roomId,
			status,
		} as UpdateTaskParams;
	},
	target: updateTaskModel.mutation.start,
});

const queriesForUpdate = [progressesModel.query, query];

[
	updateTaskModel.mutation,
	removeTaskModel.mutation,
	createTaskModel.mutation
].forEach((mutation) => {
	queriesForUpdate.forEach((query) => {
		update(query, {
			on: mutation,
			by: {
				success: ({ query, }) => {
					if (!query) {
						return {
							result: { items: [], totalCount: 0, limit: 50, },
							refetch: true,
						};
					}

					if ('error' in query) {
						return {
							error: query.error,
							refetch: true,
						};
					}

					return {
						result: query.result,
						refetch: true,
					};
				},
			},
		});
	});
});
