import { createMutation, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Array, Boolean } from 'runtypes';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse,
} from '@/interfaces/response';
import {
	CreateTaskRequest,
	GetTaskRequest,
	RemoveTaskRequest,
	Task,
	TaskResponse,
	taskResponse,
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
import { getDataExtractor } from '../mapData/dataExtractor';
import { converter } from './utils';

export const getTasksQuery = createQuery<
	number,
	StandardResponse<TaskResponse[]>,
	Error,
	StandardSuccessResponse<TaskResponse[]>,
	Task[]
>({
	effect: getTasksFx,
	contract: runtypeContract(getStandardSuccessResponse(Array(taskResponse))),
	validate: getIsSuccessResponseValidator(),
	mapData: (data: StandardSuccessResponse<TaskResponse[]>) =>
		getDataExtractor<TaskResponse[]>()(data).map(converter),
});

export const getTaskQuery = createQuery<
	GetTaskRequest,
	StandardResponse<TaskResponse>,
	Error,
	StandardSuccessResponse<TaskResponse>,
	Task
>({
	effect: getTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(taskResponse)),
	validate: getIsSuccessResponseValidator(),
	mapData: (data: StandardSuccessResponse<TaskResponse>) =>
		converter(getDataExtractor<TaskResponse>()(data)),
});

export const createTaskMutation = createMutation<
	CreateTaskRequest,
	StandardResponse<TaskResponse>,
	StandardSuccessResponse<TaskResponse>,
	Error
>({
	effect: createTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(taskResponse)),
});

export const updateTaskMutation = createMutation<
	UpdateTaskRequest,
	StandardResponse<TaskResponse>,
	StandardSuccessResponse<TaskResponse>,
	Error
>({
	effect: updateTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(taskResponse)),
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
