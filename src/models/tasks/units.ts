/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { StandardResponse } from '@/types/response';
import {
	CreateTaskRequest,
	RemoveTaskRequest,
	Task,
	UpdateTaskRequest,
	GetTaskRequest,
} from './types';

export const TasksDomain = createDomain('TasksDomain');

export const getTasksFx = TasksDomain.effect<number, StandardResponse<Task[]>>(
	'getTasksFx'
);
export const getTaskFx = TasksDomain.effect<
	GetTaskRequest,
	StandardResponse<Task>
>('getTaskFx');
export const createTaskFx = TasksDomain.effect<
	CreateTaskRequest,
	StandardResponse<Task>
>('createTaskFx');
export const updateTaskFx = TasksDomain.effect<
	UpdateTaskRequest,
	StandardResponse<Task>
>('updateTasksFx');
export const removeTaskFx = TasksDomain.effect<
	RemoveTaskRequest,
	StandardResponse<boolean>
>('removeTaskFx');
