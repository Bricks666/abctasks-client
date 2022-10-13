import { createMutation, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array, Boolean } from 'runtypes';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse,
} from '@/types/response';
import {
	CreateTaskRequest,
	GetTaskRequest,
	RemoveTaskRequest,
	Task,
	task,
	UpdateTaskRequest,
} from './types';
import {
	createTaskFx,
	getTaskFx,
	getTasksFx,
	removeTaskFx,
	updateTaskFx,
} from './units';
import { getIsSuccessResponseValidator } from '../validation/isSuccessResponse';
import { dataExtractor } from '../mapData/dataExtractor';

export const getTasksQuery = createQuery<
	number,
	StandardResponse<Task[]>,
	Error,
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
	Error,
	StandardSuccessResponse<Task>,
	Task
>({
	effect: getTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
	validate: getIsSuccessResponseValidator(),
	mapData: (data: StandardSuccessResponse<Task>) => dataExtractor<Task>(data),
});

export const createTaskMutation = createMutation<
	CreateTaskRequest,
	StandardResponse<Task>,
	StandardSuccessResponse<Task>,
	Error
>({
	effect: createTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
});

export const updateTaskMutation = createMutation<
	UpdateTaskRequest,
	StandardResponse<Task>,
	StandardSuccessResponse<Task>,
	Error
>({
	effect: updateTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
});

export const removeTaskMutation = createMutation<
	RemoveTaskRequest,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	Error
>({
	effect: removeTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
