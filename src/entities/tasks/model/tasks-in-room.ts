import { cache, createQuery, keepFresh } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { combine, createDomain, sample } from 'effector';
import { empty, interval, not } from 'patronum';
import { Array } from 'runtypes';

import { Task, tasksApi, task, TaskStatus, GetTasksParams } from '@/shared/api';
import { createFlag, dataExtractor, group } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const tasksInRoom = createDomain();

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

export const loaded = createFlag(false);

sample({
	clock: query.finished.finally,
	target: loaded.enable,
});

sample({
	clock: query.start,
	filter: not(empty(query.$error)),
	target: loaded.disable,
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

keepFresh(query, {
	triggers: [interval({ timeout: 6000, })],
});
