import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { combine, createDomain } from 'effector';
import { Array } from 'runtypes';

import { Task, tasksApi, task, TaskStatus, GetTasksParams } from '@/shared/api';
import { controls, routes, getParams } from '@/shared/configs';
import { dataExtractor, group } from '@/shared/lib';
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
	Error
>(tasksApi.getAll);

export const query = createQuery<
	GetTasksParams,
	StandardResponse<Task[]>,
	Error,
	StandardResponse<Task[]>,
	Task[]
>({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(task))),
	mapData: dataExtractor,
});

interface Column {
	readonly tasks: Task[];
	readonly status: TaskStatus;
	readonly hasActions: boolean;
}

const HAS_ACTIONS: TaskStatus[] = ['ready', 'review', 'in_progress'];

export const $tasksColumns = combine(query.$data, (tasks) => {
	const groupedTasks = group(tasks, 'status');

	return [
		{
			hasActions: HAS_ACTIONS.includes('ready'),
			status: 'ready',
			tasks: groupedTasks.ready ?? [],
		},
		{
			hasActions: HAS_ACTIONS.includes('in_progress'),
			status: 'in_progress',
			tasks: groupedTasks.in_progress ?? [],
		},
		{
			hasActions: HAS_ACTIONS.includes('review'),
			status: 'review',
			tasks: groupedTasks.review ?? [],
		},
		{
			hasActions: HAS_ACTIONS.includes('done'),
			status: 'done',
			tasks: groupedTasks.done ?? [],
		}
	] as Column[];
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
