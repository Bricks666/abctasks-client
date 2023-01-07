import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain } from 'effector';
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
	getStandardSuccessResponse
} from '@/shared/types';

const tasksDomain = createDomain();

/**
 * Может стоит перенести на уровень виджета(??)
 */
export const $id = tasksDomain.store<number | null>(null);
export const $status = tasksDomain.store<TaskStatus | null>(null);
const handlerFx = tasksDomain.effect<
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

cache(query);

querySync({
	controls,
	source: {
		[getParams.taskId]: $id,
		[getParams.taskStatus]: $status,
	},
	route: routes.room,
});
