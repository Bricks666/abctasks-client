import {
	atom,
	reatomResource,
	withCache,
	withDataAtom,
	withErrorAtom,
	withRetry
} from '@reatom/framework';
import { createMemStorage, reatomPersist } from '@reatom/persist';
import { createScope, molecule, use } from 'bunshi';

import { roomModel } from '@/entities/rooms/@x/tasks';

import { tasksApi } from '@/shared/api';
import { constructName, mapStandardResponse, retryQuery } from '@/shared/lib';

import { taskResponseSchema, type TaskId, type TaskModel, Task } from './types';

const modelName = 'task';

// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(createMemStorage({ name: modelName, }));

export const Scope = createScope<TaskId>(-1);

export const Molecule = molecule((): TaskModel => {
	const roomId = use(roomModel.Scope);
	const id = use(Scope);

	const fetchTask = reatomResource(
		(ctx) => {
			return ctx.schedule(() => {
				return tasksApi
					.getOne({ id, roomId, }, { signal: ctx.controller.signal, })
					.then(taskResponseSchema.parseAsync);
			});
		},
		constructName(modelName, id, 'fetchTask')
	).pipe(
		withDataAtom(null as Task | null, mapStandardResponse),
		withErrorAtom(undefined, { initState: null, }),
		withRetry(),
		withCache({ withPersist, })
	);

	retryQuery({
		store: fetchTask.dataAtom,
		query: fetchTask,
		timeout: 5000,
	});

	const { dataAtom: taskAtom, errorAtom, } = fetchTask;
	const pendingAtom = atom(
		(ctx) => !!ctx.spy(fetchTask.pendingAtom),
		constructName(modelName, id, 'pendingAtom')
	);

	return {
		taskAtom,
		errorAtom,
		pendingAtom,
	};
});
