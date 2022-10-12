/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { StandardResponse } from '@/interfaces/response';
import {
	CreateTaskRequest,
	RemoveTaskRequest,
	TaskResponse,
	UpdateTaskRequest,
	GetTaskRequest,
} from './types';

export const TasksDomain = createDomain('TasksDomain');

export const getTasksFx = TasksDomain.effect<
	number,
	StandardResponse<TaskResponse[]>
>('getTasksFx');
export const getTaskFx = TasksDomain.effect<
	GetTaskRequest,
	StandardResponse<TaskResponse>
>('getTaskFx');
export const createTaskFx = TasksDomain.effect<
	CreateTaskRequest,
	StandardResponse<TaskResponse>
>('createTaskFx');
export const updateTaskFx = TasksDomain.effect<
	UpdateTaskRequest,
	StandardResponse<TaskResponse>
>('updateTasksFx');
export const removeTaskFx = TasksDomain.effect<
	RemoveTaskRequest,
	StandardResponse<boolean>
>('removeTaskFx');
