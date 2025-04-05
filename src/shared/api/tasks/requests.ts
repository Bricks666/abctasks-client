import queryString from 'query-string';

import { instance } from '../request';

import type {
	CreateTaskRequestParams,
	CreateTaskResponseData,
	GetTaskRequestParams,
	GetTaskResponseData,
	GetTasksRequestParams,
	GetTasksResponseData,
	RemoveTaskRequestParams,
	RemoveTaskResponseData,
	UpdateTaskRequestParams,
	UpdateTaskResponseData
} from './types';

export const getAll = async (
	params: GetTasksRequestParams,
	options?: globalThis.RequestInit
): GetTasksResponseData => {
	const { roomId, ...query } = params;
	return instance
		.get(`tasks/${roomId}`, {
			...options,
			searchParams: new URLSearchParams(queryString.stringify(query)),
		})
		.json();
};

export const getOne = async (
	params: GetTaskRequestParams,
	options?: globalThis.RequestInit
): GetTaskResponseData => {
	const { roomId, id, } = params;

	return instance.get(`tasks/${roomId}/${id}`, options).json();
};

export const create = async (
	params: CreateTaskRequestParams,
	options?: globalThis.RequestInit
): CreateTaskResponseData => {
	const { roomId, ...body } = params;

	return instance
		.post(`tasks/${roomId}/create`, {
			...options,
			json: body,
		})
		.json();
};

export const update = async (
	params: UpdateTaskRequestParams,
	options?: globalThis.RequestInit
): UpdateTaskResponseData => {
	const { roomId, id, ...body } = params;

	return instance
		.put(`tasks/${roomId}/${id}/update`, {
			...options,
			json: body,
		})
		.json();
};

export const remove = async (
	params: RemoveTaskRequestParams,
	options?: globalThis.RequestInit
): RemoveTaskResponseData => {
	const { roomId, id, } = params;

	return instance.delete(`tasks/${roomId}/${id}/remove`, options).json();
};
