import { StandardResponse } from '@/shared/types';

import { instance, normalizeQuery } from '../request';

import {
	GetTaskParams,
	CreateTaskParams,
	UpdateTaskParams,
	RemoveTaskParams,
	Task,
	GetTasksParams
} from './types';

export const getAll = async ({ roomId, ...query }: GetTasksParams) => {
	return instance
		.get(`tasks/${roomId}`, {
			searchParams: new URLSearchParams(normalizeQuery(query)),
		})
		.json<StandardResponse<Task[]>>();
};

export const getOne = async ({ roomId, id, }: GetTaskParams) => {
	return instance.get(`tasks/${roomId}/${id}`).json<StandardResponse<Task>>();
};

export const create = async ({ roomId, ...body }: CreateTaskParams) => {
	return instance
		.post(`tasks/${roomId}/create`, {
			json: body,
		})
		.json<StandardResponse<Task>>();
};

export const update = async ({ id, roomId, ...body }: UpdateTaskParams) => {
	return instance
		.put(`tasks/${roomId}/${id}/update`, {
			json: body,
		})
		.json<StandardResponse<Task>>();
};

export const remove = async ({ roomId, id, }: RemoveTaskParams) => {
	return instance
		.delete(`tasks/${roomId}/${id}/remove`)
		.json<StandardResponse<boolean>>();
};
