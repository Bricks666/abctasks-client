/* eslint-disable no-underscore-dangle */
import {
	action,
	atom,
	reatomResource,
	withCache,
	withDataAtom,
	withErrorAtom,
	withRetry
} from '@reatom/framework';
import { createMemStorage, reatomPersist } from '@reatom/persist';
import { molecule, use } from 'bunshi';

import { roomModel } from '@/entities/rooms/@x/tasks';

import { tasksApi } from '@/shared/api';
import { constructName, mapStandardResponse, retryQuery } from '@/shared/lib';

import { Task, TaskId } from '../task';

import { type Tasks, type TasksModel, tasksResponseSchema } from './types';

const modelName = 'tasks';

const storage = createMemStorage({ name: modelName, });
// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(storage);

export const Molecule = molecule((): TasksModel => {
	const roomId = use(roomModel.Scope);

	const fetch = reatomResource(
		async (ctx) => {
			return ctx.schedule(() => {
				return tasksApi
					.getAll({ roomId, }, { signal: ctx.controller.signal, })
					.then(tasksResponseSchema.parseAsync);
			});
		},
		constructName(modelName, 'fetch')
	).pipe(
		withDataAtom([] as Tasks, mapStandardResponse),
		withErrorAtom(undefined, { initState: null, }),
		withRetry(),
		withCache({ withPersist, })
	);

	const add = action(
		(ctx, task: Task) => {
			const tasks = ctx.get(tasksAtom);

			const tasksWithNewOne = [...tasks, task];

			storage.snapshotAtom(ctx, (snapshot) => {
				return {
					...snapshot,
					[fetch.__reatom.name!]: {
						...snapshot[fetch.__reatom.name!],
						data: tasksWithNewOne,
					},
				};
			});

			return tasksAtom(ctx, tasksWithNewOne);
		},
		constructName(modelName, 'add')
	);
	const update = action(
		(ctx, task: Task) => {
			const tasks = ctx.get(tasksAtom);

			const updatedTasks = tasks.map((oldTask) =>
				oldTask.id === task.id ? task : oldTask
			);

			storage.snapshotAtom(ctx, (snapshot) => {
				return {
					...snapshot,
					[fetch.__reatom.name!]: {
						...snapshot[fetch.__reatom.name!],
						data: updatedTasks,
					},
				};
			});

			return tasksAtom(ctx, updatedTasks);
		},
		constructName(modelName, 'update')
	);
	const remove = action(
		(ctx, taskId: TaskId) => {
			const tasks = ctx.get(tasksAtom);

			const filteredTasks = tasks.filter((task) => task.id !== taskId);

			storage.snapshotAtom(ctx, (snapshot) => {
				return {
					...snapshot,
					[fetch.__reatom.name!]: {
						...snapshot[fetch.__reatom.name!],
						data: filteredTasks,
					},
				};
			});

			return tasksAtom(ctx, filteredTasks);
		},
		constructName(modelName, 'remove')
	);

	const pendingAtom = atom(
		(ctx) => {
			return !!ctx.spy(fetch.pendingAtom);
		},
		constructName(modelName, 'pendingAtom')
	);
	const { errorAtom, dataAtom: tasksAtom, retry: refetch, } = fetch;

	retryQuery({
		query: fetch,
		store: tasksAtom,
		timeout: 5000,
	});

	return {
		add,
		errorAtom,
		pendingAtom,
		refetch,
		remove,
		tasksAtom,
		update,
	};
});
