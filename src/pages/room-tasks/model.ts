import { cache, createQuery, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';

import { dragTaskModel } from '@/widgets/tasks';

import {
	createTaskModel,
	removeTaskModel,
	tasksFiltersModel,
	updateTaskModel
} from '@/features/tasks';

import { activitiesInRoomModel } from '@/entities/activities';
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
	activitiesApi.getAll({ roomId, count: 5, by: 'createdAt', type: 'desc', })
);

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

cache(query);

sample({
	clock: [
		createTaskModel.mutation.finished.success,
		removeTaskModel.mutation.finished.success,
		updateTaskModel.mutation.finished.success
	],
	fn: ({ params, }) => ({ roomId: params.roomId, }),
	target: query.start,
});

sample({
	clock: [authorizedRoute.opened],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: query.start,
});

/*
 * TODO: Сделать обертку над роутом, чтобы отслеживать отдельно изменения параметров
 */
sample({
	clock: [authorizedRoute.opened],
	fn: ({ params, query, }) => ({
		roomId: params.id,
		authorIds: query[getParams.userId],
		tagIds: query[getParams.userId],
		before: query[getParams.before],
		after: query[getParams.after],
	}),
	target: [
		tasksInRoomModel.query.start,
		activitiesInRoomModel.query.start,
		tagsModel.query.start,
		roomsModel.query.start,
		usersInRoomModel.query.start
	],
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
	fn: ({ id, }, values) => ({ roomId: id, ...values, }),
	target: tasksInRoomModel.query.start,
});

sample({
	clock: authorizedRoute.closed,
	target: reset,
});

sample({
	clock: [
		updateTaskModel.mutation.finished.success,
		createTaskModel.mutation.finished.success,
		removeTaskModel.mutation.finished.success
	],
	fn: ({ params, }) => ({ roomId: params.roomId, }),
	target: progressesModel.query.start,
});

sample({
	clock: authorizedRoute.closed,
	target: progressesModel.query.reset,
});

sample({
	clock: [authorizedRoute.opened, authorizedRoute.updated],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: progressesModel.query.start,
});

sample({
	clock: dragTaskModel.dropped,
	source: { id: dragTaskModel.$id, params: authorizedRoute.$params, },
	fn: ({ id, params, }, evt) => {
		const { status, } = evt.currentTarget.dataset;
		return {
			id,
			roomId: params.id,
			status,
		} as UpdateTaskParams;
	},
	target: updateTaskModel.mutation.start,
});

[
	updateTaskModel.mutation,
	removeTaskModel.mutation,
	createTaskModel.mutation
].forEach((mutation) => {
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
