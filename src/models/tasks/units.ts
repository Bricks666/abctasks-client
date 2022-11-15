/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { createGate } from 'effector-react';
import { StandardFailError } from '@/packages/request';
import { StandardResponse, InRoomRequest } from '@/types';
import {
	GetTaskRequest,
	CreateTaskRequest,
	UpdateTaskRequest,
	RemoveTaskRequest,
} from '@/api';
import { Task } from './types';

export const TasksDomain = createDomain('TasksDomain');

export const getTasksFx = TasksDomain.effect<
	number,
	StandardResponse<Task[]>,
	StandardFailError
>('getTasksFx');

export const getTaskFx = TasksDomain.effect<
	GetTaskRequest,
	StandardResponse<Task>,
	StandardFailError
>('getTaskFx');

export const createTaskFx = TasksDomain.effect<
	CreateTaskRequest,
	StandardResponse<Task>,
	StandardFailError
>('createTaskFx');

export const updateTaskFx = TasksDomain.effect<
	UpdateTaskRequest,
	StandardResponse<Task>,
	StandardFailError
>('updateTaskFx');

export const removeTaskFx = TasksDomain.effect<
	RemoveTaskRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeTaskFx');

export const TasksGate = createGate<InRoomRequest>({
	domain: TasksDomain,
	name: 'tasksGate',
});

export const TaskGate = createGate<GetTaskRequest>({
	domain: TasksDomain,
	name: 'taskGate',
});
