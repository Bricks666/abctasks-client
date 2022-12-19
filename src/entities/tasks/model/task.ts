import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetTaskRequest, Task, tasksApi, task } from '@/shared/api';
import {
	StandardFailError,
	getIsSuccessResponseValidator,
	dataExtractor
} from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const taskDomain = createDomain();

export const reset = taskDomain.event();
export const invalidateCache = taskDomain.event();
export const handlerFx = taskDomain.effect<
	GetTaskRequest,
	StandardResponse<Task>,
	StandardFailError
>();
handlerFx.use(tasksApi.getOne);

export const query = createQuery<
	GetTaskRequest,
	StandardResponse<Task>,
	StandardFailError,
	StandardSuccessResponse<Task>,
	Task
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});

export const Gate = createGate<GetTaskRequest>({
	domain: taskDomain,
});

sample({
	clock: Gate.open,
	target: query.start,
});

sample({
	clock: reset,
	target: query.reset,
});

cache(query, {
	purge: invalidateCache,
});
