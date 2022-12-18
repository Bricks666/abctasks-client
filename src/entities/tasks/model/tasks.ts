import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Array } from 'runtypes';
import { Task, GetTaskRequest, tasksApi, task, TaskStatus } from '@/shared/api';
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
export const $selectedTaskId = tasksDomain.store<number | null>(null);
export const $selectedStatus = tasksDomain.store<TaskStatus | null>(null);

export const getTasksFx = tasksDomain.effect<
	number,
	StandardResponse<Task[]>,
	StandardFailError
>('getTasksFx');

export const getTaskFx = tasksDomain.effect<
	GetTaskRequest,
	StandardResponse<Task>,
	StandardFailError
>('getTaskFx');
getTasksFx.use(tasksApi.getAll);
getTaskFx.use(tasksApi.getOne);

export const getTasksQuery = createQuery<
	number,
	StandardResponse<Task[]>,
	StandardFailError,
	StandardSuccessResponse<Task[]>,
	Task[]
>({
	initialData: [],
	effect: getTasksFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(task))),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});

export const getTaskQuery = createQuery<
	GetTaskRequest,
	StandardResponse<Task>,
	StandardFailError,
	StandardSuccessResponse<Task>,
	Task
>({
	effect: getTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});

export const TasksGate = createGate<InRoomRequest>({
	domain: tasksDomain,
	name: 'tasksGate',
});

export const TaskGate = createGate<GetTaskRequest>({
	domain: tasksDomain,
	name: 'taskGate',
});

sample({
	clock: TasksGate.open,
	fn: ({ roomId, }) => roomId,
	target: getTasksQuery.start,
});

sample({
	clock: TaskGate.open,
	target: getTaskQuery.start,
});

querySync({
	controls,
	source: {
		[getParams.taskId]: $selectedTaskId,
		[getParams.taskStatus]: $selectedStatus,
	},
	route: routes.room,
});

getTasksQuery.$data.watch(console.debug);
getTaskQuery.finished.failure.watch(console.debug);
