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
export const add = tasksDomain.event<Task>();
export const update = tasksDomain.event<Task>();
export const remove = tasksDomain.event<Pick<Task, 'id'>>();
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

cache(query);

querySync({
	controls,
	source: {
		[getParams.taskId]: $id,
		[getParams.taskStatus]: $status,
	},
	route: routes.room,
});

sample({
	clock: add,
	source: query.$data,
	fn: (tasks, task) => [...tasks, task],
	target: query.$data,
});

sample({
	clock: update,
	source: query.$data,
	fn: (tasks, task) => tasks.map((t) => (t.id === task.id ? task : t)),
	target: query.$data,
});

sample({
	clock: remove,
	source: query.$data,
	fn: (tasks, { id, }) => tasks.filter((task) => task.id !== id),
	target: query.$data,
});
