import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain } from 'effector';
import { Array } from 'runtypes';
import { Task, tasksApi, task, TaskStatus, GetTasksParams } from '@/shared/api';
import { controls, routes, getParams } from '@/shared/configs';
import { dataExtractor, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const tasksInRoom = createDomain();

/**
 * Может стоит перенести на уровень виджета(??)
 */
export const $id = tasksInRoom.store<number | null>(null);
export const $status = tasksInRoom.store<TaskStatus | null>(null);
const handlerFx = tasksInRoom.effect<
	GetTasksParams,
	StandardResponse<Task[]>,
	StandardFailError
>();

handlerFx.use(tasksApi.getAllInRoom);

export const query = createQuery<
	GetTasksParams,
	StandardResponse<Task[]>,
	StandardFailError,
	StandardResponse<Task[]>,
	Task[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(task))),
	mapData: dataExtractor,
});

cache(query);

querySync({
	controls,
	source: {
		[getParams.taskId]: $id,
		[getParams.taskStatus]: $status,
	},
	route: routes.room.tasks,
});
