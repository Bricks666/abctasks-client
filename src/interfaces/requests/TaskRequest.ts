import { TaskStatus } from "@/models/Tasks/types";
import { ID } from "../common";

export interface TaskRequest {
	readonly roomId: ID;
	readonly groupId: ID;
	readonly content: string;
	readonly status: TaskStatus;
}

export interface EditTaskRequest extends TaskRequest {
	readonly id: ID;
}

export interface DeleteTaskRequest {
	readonly id: ID;
	readonly roomId: ID;
}

export interface MoveTaskRequest {
	readonly roomId: ID;
	readonly taskId: ID;
	readonly status: TaskStatus;
}
