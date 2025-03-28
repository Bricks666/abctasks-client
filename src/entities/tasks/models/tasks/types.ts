import { Action, Atom } from '@reatom/framework';
import zod from 'zod';

import { createStandardResponseSchema } from '@/shared/lib';

import { Task, TaskId, taskSchema } from '../task';

export const tasksSchema = zod.array(taskSchema);
export const tasksResponseSchema = createStandardResponseSchema(tasksSchema);

export type Tasks = zod.infer<typeof tasksSchema>;

export interface TasksModel {
	readonly tasksAtom: Atom<Tasks>;
	readonly pendingAtom: Atom<boolean>;
	readonly errorAtom: Atom<Error | null>;
	readonly refetch: Action;

	readonly add: Action<[task: Task], Tasks>;
	readonly update: Action<[task: Task], Tasks>;
	readonly remove: Action<[taskId: TaskId], Tasks>;
}
