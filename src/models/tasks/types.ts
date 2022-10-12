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
	'review',
];

export interface TaskAuthor {
	readonly name: string;
	readonly photo: string | null;
}

export interface Task {
	readonly id: number;
	readonly groupId: number;
	readonly roomId: number;
	readonly status: TaskStatus;
	readonly content: string;
	readonly commentCount: number;
	readonly createdAt: string;
	readonly author: TaskAuthor;
}

export interface GroupedByStatusTasks {
	readonly ready: Task[];
	readonly inProgress: Task[];
	readonly needReview: Task[];
	readonly done: Task[];
}

export type StatusNamesStore = {
	readonly [key in keyof GroupedByStatusTasks]: TaskStatus;
};

export const taskResponse = Record({
	taskId: Number,
	roomId: Number,
	groupId: Number,
	authorId: Number,
	status: taskStatus,
	content: String,
	createdAt: String,
});

export interface TaskResponse extends Static<typeof taskResponse> {}

export interface GetTaskRequest {
	readonly id: number;
	readonly roomId: number;
}

export interface CreateTaskRequest {
	readonly roomId: number;
	readonly groupId: number;
	readonly content: string;
	readonly status: TaskStatus;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {
	readonly id: number;
}

export interface RemoveTaskRequest {
	readonly id: number;
	readonly roomId: number;
}
