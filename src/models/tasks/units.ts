/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { createGate } from 'effector-react';
import { StandardResponse, InRoomRequest } from '@/types';
import { Task } from './types';
import {
	GetTaskRequest,
	CreateTaskRequest,
	UpdateTaskRequest,
	RemoveTaskRequest,
} from '@/api';
import { StandardFailError } from '@/packages/request';
import { attachWithAccessToken } from '../auth';

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

export const createTaskBaseFx = TasksDomain.effect<
	CreateTaskRequest,
	StandardResponse<Task>,
	StandardFailError
>('createTaskBaseFx');
export const createTaskFx = attachWithAccessToken({
	effect: createTaskBaseFx,
	name: 'createTaskFx',
});

export const updateTaskBaseFx = TasksDomain.effect<
	UpdateTaskRequest,
	StandardResponse<Task>,
	StandardFailError
>('updateTaskBaseFx');
export const updateTaskFx = attachWithAccessToken({
	effect: updateTaskBaseFx,
	name: 'updateTaskFx',
});

export const removeTaskBaseFx = TasksDomain.effect<
	RemoveTaskRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeTaskBaseFx');
export const removeTaskFx = attachWithAccessToken({
	effect: removeTaskBaseFx,
	name: 'removeTaskFx',
});

export const tasksGate = createGate<InRoomRequest>({
	domain: TasksDomain,
	name: 'tasksGate',
});

export const taskGate = createGate<GetTaskRequest>({
	domain: TasksDomain,
	name: 'taskGate',
});
