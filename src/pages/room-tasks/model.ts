import { cache, createQuery } from '@farfetched/core';
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

import {
	activityActionsModel,
	activitySpheresModel
} from '@/entities/activities';
import { notificationsModel } from '@/entities/notifications';
import { progressesModel } from '@/entities/progresses';
import { tagsModel } from '@/entities/tags';
import { tasksInRoomModel } from '@/entities/tasks';

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
>(({ roomId, }) => activitiesApi.getAll({ roomId, count: 5, }));

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
	clock: [authorizedRoute.opened, authorizedRoute.updated],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: query.start,
});

sample({
	clock: query.start,
	target: [activityActionsModel.query.start, activitySpheresModel.query.start],
});

sample({
	clock: [authorizedRoute.opened, authorizedRoute.updated],
	fn: ({ params, }) => params.id,
	target: tagsModel.query.start,
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
	target: tasksInRoomModel.query.start,
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

sample({
	clock: createTaskModel.mutation.finished.success,
	fn: () => ({
		message: 'Task was created successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: createTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not created',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeTaskModel.mutation.finished.success,
	fn: () => ({
		message: 'Task was removed successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not removed',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateTaskModel.mutation.finished.success,
	fn: () => ({
		message: 'Task was update successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not update',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
