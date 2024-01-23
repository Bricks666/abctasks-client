import {
	Record,
	Number,
	String,
	Static,
	Union,
	Literal,
	Array
} from 'runtypes';

import { DatesFiltersParams, InRoomParams } from '@/shared/types';

import { user } from '../auth';
import { tag } from '../tags';

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
	roomId: Number,
	tags: Array(tag),
	author: user,
	title: String,
	description: String.nullable(),
	status: taskStatus,
	createdAt: String,
	updatedAt: String.nullable(),
});

export interface Task extends Static<typeof task> {}

export interface GroupedByStatusTasks {
	readonly ready: Task[];
	readonly in_progress: Task[];
	readonly needReview: Task[];
	readonly done: Task[];
}

export interface GetTasksParams extends InRoomParams, DatesFiltersParams {
	readonly authorIds?: number[];
	readonly tagIds?: number[];
}

export interface GetTaskParams extends InRoomParams {
	readonly id: number;
}

export interface CreateTaskParams
	extends Pick<Task, 'roomId' | 'title' | 'status' | 'description'> {
	readonly tagIds: number[];
}

export interface UpdateTaskParams
	extends Partial<Omit<CreateTaskParams, 'roomId'>>,
		InRoomParams {
	readonly id: number;
}

export interface RemoveTaskParams extends InRoomParams {
	readonly id: number;
}
