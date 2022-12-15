/* eslint-disable sonarjs/no-duplicate-string */
import { Record, Number, String, Static, Union, Literal } from 'runtypes';
import { AccessOptions } from '@/shared/packages';

export const taskStatus = Union(
	Literal('done'),
	Literal('in progress'),
	Literal('review'),
	Literal('ready')
);

export type TaskStatus = Static<typeof taskStatus>;
export const statuses: TaskStatus[] = [
	'done',
	'in progress',
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
	readonly 'in progress': Task[];
	readonly needReview: Task[];
	readonly done: Task[];
}

export type StatusNamesStore = {
	readonly [key in keyof GroupedByStatusTasks]: TaskStatus;
};

export interface GetTaskRequest {
	readonly id: number;
	readonly roomId: number;
}

export interface CreateTaskRequest
	extends Required<AccessOptions>,
		Pick<Task, 'roomId' | 'groupId' | 'content' | 'status'> {}

export interface UpdateTaskRequest
	extends Partial<Omit<CreateTaskRequest, 'accessToken'>>,
		Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}

export interface RemoveTaskRequest extends Required<AccessOptions> {
	readonly id: number;
	readonly roomId: number;
}
