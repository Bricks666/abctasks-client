import { TaskStatus } from "@/models/Tasks/types";

export interface TaskRequest {
	readonly content: string;
	readonly groupId: number;
	readonly status: TaskStatus;
}

export interface EditTaskRequest extends TaskRequest {
	readonly id: number;
}
