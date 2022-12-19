import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Array } from 'runtypes';
import { Task, tasksApi, task, TaskStatus } from '@/shared/api';
import { controls, routes, getParams } from '@/shared/configs';
import {
	getIsSuccessResponseValidator,
	dataExtractor,
	StandardFailError
} from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse,
	InRoomRequest
} from '@/shared/types';

const tasksDomain = createDomain();

/**
 * Может стоит перенести на уровень виджета(??)
 */
export const $id = tasksDomain.store<number | null>(null);
export const $status = tasksDomain.store<TaskStatus | null>(null);
export const reset = tasksDomain.event();
export const invalidateCache = tasksDomain.event();
export const handlerFx = tasksDomain.effect<
	number,
	StandardResponse<Task[]>,
	StandardFailError
>();

handlerFx.use(tasksApi.getAll);

export const query = createQuery<
	number,
	StandardResponse<Task[]>,
	StandardFailError,
	StandardSuccessResponse<Task[]>,
	Task[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(task))),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});

export const Gate = createGate<InRoomRequest>({
	domain: tasksDomain,
});

sample({
	clock: Gate.open,
	fn: ({ roomId, }) => roomId,
	target: query.start,
});

sample({
	clock: reset,
	target: invalidateCache,
});

cache(query, {
	staleAfter: '15min',
	purge: invalidateCache,
});

querySync({
	controls,
	source: {
		[getParams.taskId]: $id,
		[getParams.taskStatus]: $status,
	},
	route: routes.room,
});
