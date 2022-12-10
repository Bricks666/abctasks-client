import { TaskStatus } from '@/shared/models';
import { AccessOptions } from '@/shared/packages';

export interface GetTaskRequest {
	readonly id: number;
	readonly roomId: number;
}

export interface CreateTaskRequest extends Required<AccessOptions> {
	readonly roomId: number;
	readonly groupId: number;
	readonly content: string;
	readonly status: TaskStatus;
}

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
