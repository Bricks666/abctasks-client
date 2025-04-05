import { Atom } from '@reatom/framework';
import zod from 'zod';

import { tagSchema } from '@/entities/tags/@x/tasks';
import { userSchema } from '@/entities/users/@x/tasks';

import { createStandardResponseSchema } from '@/shared/lib';

export const taskStatusSchema = zod.union([
	zod.literal('done'),
	zod.literal('in_progress'),
	zod.literal('review'),
	zod.literal('ready')
]);

export type TaskStatus = zod.infer<typeof taskStatusSchema>;

export const taskSchema = zod.object({
	id: zod.number(),
	roomId: zod.number(),
	tags: zod.array(tagSchema),
	author: userSchema,
	title: zod.string(),
	description: zod.string().nullable(),
	status: taskStatusSchema,
	createdAt: zod.string(),
	updatedAt: zod.string().nullable(),
});

export const taskResponseSchema = createStandardResponseSchema(taskSchema);

export interface Task extends zod.infer<typeof taskSchema> {}
export type TaskId = Task['id'];

export interface TaskModel {
	readonly taskAtom: Atom<Task | null>;
	readonly errorAtom: Atom<Error | null>;
	readonly pendingAtom: Atom<boolean>;
}
