import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array, Boolean } from 'runtypes';
import {
	GetTaskRequest,
	CreateTaskRequest,
	UpdateTaskRequest,
	RemoveTaskRequest
} from '@/shared/api';
import { StandardFailError } from '@/shared/packages';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/shared/types';
import { createMutationWithAccess } from '../../lib/fabrics';
import { getIsSuccessResponseValidator, dataExtractor } from '../utils';
import { Task, task } from './types';
import {
	createTaskFx,
	getTaskFx,
	getTasksFx,
	removeTaskFx,
	updateTaskFx
} from './units';

export const getTasksQuery = createQuery<
	number,
	StandardResponse<Task[]>,
	StandardFailError,
	StandardSuccessResponse<Task[]>,
	Task[]
>({
	initialData: [],
	effect: getTasksFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(task))),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});

export const getTaskQuery = createQuery<
	GetTaskRequest,
	StandardResponse<Task>,
	StandardFailError,
	StandardSuccessResponse<Task>,
	Task
>({
	effect: getTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
	validate: getIsSuccessResponseValidator(),
	mapData: dataExtractor,
});

export const createTaskMutation = createMutationWithAccess<
	CreateTaskRequest,
	StandardResponse<Task>,
	StandardSuccessResponse<Task>,
	StandardFailError
>({
	effect: createTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
});

export const updateTaskMutation = createMutationWithAccess<
	UpdateTaskRequest,
	StandardResponse<Task>,
	StandardSuccessResponse<Task>,
	StandardFailError
>({
	effect: updateTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
});

export const removeTaskMutation = createMutationWithAccess<
	RemoveTaskRequest,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: removeTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
