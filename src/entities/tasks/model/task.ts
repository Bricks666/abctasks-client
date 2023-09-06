import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { GetTaskParams, Task, tasksApi, task } from '@/shared/api';
import { Error, dataExtractor } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const taskDomain = createDomain();

const handlerFx = taskDomain.effect<
	GetTaskParams,
	StandardResponse<Task>,
	Error
>(tasksApi.getOne);

export const query = createQuery<
	GetTaskParams,
	StandardResponse<Task>,
	Error,
	StandardResponse<Task>,
	Task
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(task)),

	mapData: dataExtractor,
});

export const Gate = createGate<GetTaskParams>({
	domain: taskDomain,
});

sample({
	clock: Gate.open,
	target: query.start,
});

sample({
	clock: Gate.close,
	target: query.reset,
});
