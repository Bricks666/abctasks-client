import { cache, createQuery, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { RouteQuery, querySync } from 'atomic-router';
import { createDomain, createStore, sample } from 'effector';
import { empty, not } from 'patronum';

import { dragTaskModel } from '@/widgets/tasks';

import {
	createTaskModel,
	removeTaskModel,
	tasksFiltersModel,
	updateTaskModel
} from '@/features/tasks';

import { progressesModel } from '@/entities/progresses';
import { roomsModel } from '@/entities/rooms';
import { tagsModel } from '@/entities/tags';
import { tasksInRoomModel } from '@/entities/tasks';
import { usersInRoomModel } from '@/entities/users';

import {
	Activity,
	UpdateTaskParams,
	activitiesApi,
	activity
} from '@/shared/api';
import { controls, getParams, routes } from '@/shared/configs';
import { dataExtractor } from '@/shared/lib';
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
	StandardResponse<PaginationResponse<Activity>>
>(({ roomId, }) =>
	activitiesApi.getAll({ roomId, count: 6, by: 'createdAt', type: 'desc', })
);
const $roomId = createStore<null | number>(null);

export const query = createQuery<
	InRoomParams,
	StandardResponse<PaginationResponse<Activity>>,
	Error,
	StandardResponse<PaginationResponse<Activity>>,
	PaginationResponse<Activity>
>({
	initialData: { items: [], totalCount: 0, limit: 5, },
	effect: handlerFx,
	contract: runtypeContract(
		getStandardResponse(getPaginationResponse(activity))
	),
	mapData: dataExtractor,
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
		authorIds: query[getParams.userId],
		tagIds: query[getParams.userId],
		before: query[getParams.before],
		after: query[getParams.after],
	};
};

cache(query);

sample({
	source: authorizedRoute.$params,
	fn: (params) => params.id,
	target: $roomId,
});

sample({
	clock: $roomId,
	source: authorizedRoute.$query,
	filter: not(empty($roomId)),
	fn: (query, roomId) => ({
		roomId: roomId as number,
		...mapQuery(query),
	}),
	target: queries.map((query) => query.start),
});

querySync({
	controls,
	source: {
		[getParams.userId]: fields.authorIds.$value,
		[getParams.tagId]: fields.tagIds.$value,
		[getParams.after]: fields.after.$value,
		[getParams.before]: fields.before.$value,
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
	target: reset,
});

sample({
	clock: authorizedRoute.closed,
	target: queries.map((query) => query.reset),
});

sample({
	clock: authorizedRoute.closed,
	target: $roomId.reinit!,
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
