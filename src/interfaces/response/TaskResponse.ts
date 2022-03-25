import { TaskStatus } from "@/models/Tasks/types";
import { ID } from "../common";

export interface TasksResponse {
	readonly tasks: TaskResponse[];
}

export interface TaskResponse {
	readonly todoId: number;
	readonly groupId: ID;
	readonly roomId: ID;
	readonly content: string;
	readonly date: string;
	readonly login: string;
	readonly photo: null | string;
	readonly status: TaskStatus;
}

export interface CreateTaskResponse {
	readonly task: TaskResponse;
}

export interface DeleteTaskResponse {
	readonly taskId: number;
}
