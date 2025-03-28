import { DatesFiltersParams, StandardResponse } from '@/shared/types';

import { TagsDto } from '../tags';
import { UserDto } from '../users';

export type TaskStatusDto = 'done' | 'in_progress' | 'review' | 'ready';

export interface TaskDto {
	readonly id: number;
	readonly roomId: number;
	readonly tags: TagsDto;
	readonly author: UserDto;
	readonly title: string;
	readonly description: string | null;
	readonly status: TaskStatusDto;
	readonly createdAt: string;
	readonly updatedAt: string | null;
}
export type TasksDto = TaskDto[];

export interface GetTasksRequestParams extends DatesFiltersParams {
	readonly roomId: number;
	readonly authorIds?: number[];
	readonly tagIds?: number[];
}
export type GetTasksResponseData = Promise<StandardResponse<TasksDto>>;

export interface GetTaskRequestParams {
	readonly roomId: number;
	readonly id: number;
}
export type GetTaskResponseData = Promise<StandardResponse<TaskDto>>;

export interface CreateTaskRequestParams
	extends Pick<TaskDto, 'roomId' | 'title' | 'status' | 'description'> {
	readonly roomId: number;
	readonly title: string;
	readonly status: TaskStatusDto;
	readonly description: string;
	readonly tagIds: number[];
}
export type CreateTaskResponseData = Promise<StandardResponse<TaskDto>>;

export interface UpdateTaskRequestParams {
	readonly id: number;
	readonly roomId: number;
	readonly title: string;
	readonly status: TaskStatusDto;
	readonly description: string;
	readonly tagIds: number[];
}
export type UpdateTaskResponseData = Promise<StandardResponse<TaskDto>>;

export interface RemoveTaskRequestParams {
	readonly id: number;
	readonly roomId: number;
}
export type RemoveTaskResponseData = Promise<StandardResponse<boolean>>;
