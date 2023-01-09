/* eslint-disable sonarjs/no-duplicate-string */
import { Record, Number, String, Static, Union, Literal } from 'runtypes';
import { AccessOptions } from '@/shared/lib';

export const taskStatus = Union(
	Literal('done'),
	Literal('in_progress'),
	Literal('review'),
	Literal('ready')
);

export type TaskStatus = Static<typeof taskStatus>;
export const statuses: TaskStatus[] = [
	'done',
	'in_progress',
	'ready',
	'review'
];

export const task = Record({
	id: Number,
	groupId: Number,
	roomId: Number,
	authorId: Number,
	status: taskStatus,
	content: String,
	createdAt: String,
});

export interface Task extends Static<typeof task> {}

export interface GroupedByStatusTasks {
	readonly ready: Task[];
	readonly in_progress: Task[];
	readonly needReview: Task[];
	readonly done: Task[];
}

export type StatusNamesStore = {
	readonly [key in keyof GroupedByStatusTasks]: TaskStatus;
};

export interface GetTaskParams {
	readonly id: number;
	readonly roomId: number;
}

export interface CreateTaskParams
	extends Required<AccessOptions>,
		Pick<Task, 'roomId' | 'groupId' | 'content' | 'status'> {}

export interface UpdateTaskParams
	extends Partial<Omit<CreateTaskParams, 'accessToken'>>,
		Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}

export interface RemoveTaskParams extends Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}
