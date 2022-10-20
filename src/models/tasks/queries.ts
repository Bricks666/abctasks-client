import { createMutation, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array, Boolean } from 'runtypes';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse,
} from '@/types/response';
import { Task, task } from './types';
import {
	createTaskFx,
	getTaskFx,
	getTasksFx,
	removeTaskFx,
	updateTaskFx,
} from './units';
import { getIsSuccessResponseValidator } from '../validation/isSuccessResponse';
import { dataExtractor } from '../mapData/dataExtractor';
import {
	GetTaskRequest,
	CreateTaskRequest,
	UpdateTaskRequest,
	RemoveTaskRequest,
} from '@/api';
import { WithoutAccess } from '../auth';
import { StandardFailError } from '@/packages/request';

export const getTasksQuery = createQuery<
	number,
	StandardResponse<Task[]>,
	StandardFailError,
	StandardSuccessResponse<Task[]>,
	Task[]
>({
	effect: getTasksFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(task))),
	validate: getIsSuccessResponseValidator(),
	mapData: (data: StandardSuccessResponse<Task[]>) =>
		dataExtractor<Task[]>(data),
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
	mapData: (data: StandardSuccessResponse<Task>) => dataExtractor<Task>(data),
});

export const createTaskMutation = createMutation<
	WithoutAccess<CreateTaskRequest>,
	StandardResponse<Task>,
	StandardSuccessResponse<Task>,
	StandardFailError
>({
	effect: createTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
});

export const updateTaskMutation = createMutation<
	WithoutAccess<UpdateTaskRequest>,
	StandardResponse<Task>,
	StandardSuccessResponse<Task>,
	StandardFailError
>({
	effect: updateTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
});

export const removeTaskMutation = createMutation<
	WithoutAccess<RemoveTaskRequest>,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: removeTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
