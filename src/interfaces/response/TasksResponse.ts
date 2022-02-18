import { TaskStatus } from "@/models/Tasks/types";

export interface TasksResponse {
	readonly tasks: TaskResponse[];
}

export interface TaskResponse {
	readonly content: string;
	readonly date: string;
  readonly groupId: number;
	readonly login: string;
	readonly photo: null | string;
	readonly status: TaskStatus;
	readonly todoId: number;
}
