/* eslint-disable sonarjs/no-duplicate-string */
import { Record, Number, String, Static, Union, Literal } from 'runtypes';

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
