import { TaskStatus } from "@/models/Tasks/types";

export interface MoveTaskRequest {
	readonly taskId: number;
	readonly status: TaskStatus;
}
