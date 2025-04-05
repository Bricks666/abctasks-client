import { instance } from '../request';

import type {
	GetTagRequestParams,
	CreateTagRequestParams,
	UpdateTagRequestParams,
	RemoveTagRequestParams,
	GetAllTagsRequestParams,
	GetAllTagsResponseData,
	GetTagResponseData,
	RemoveTagResponseData,
	UpdateTagResponseData,
	CreateTagResponseData
} from './types';

export const getAll = async (
	params: GetAllTagsRequestParams,
	options?: globalThis.RequestInit
): GetAllTagsResponseData => {
	return instance.get(`tags/${params.roomId}`, options).json();
};

export const getOne = async (
	params: GetTagRequestParams,
	options?: globalThis.RequestInit
): GetTagResponseData => {
	const { roomId, id, } = params;

	return instance.get(`tags/${roomId}/${id}`, options).json();
};

export const create = async (
	params: CreateTagRequestParams,
	options?: globalThis.RequestInit
): CreateTagResponseData => {
	const { roomId, ...body } = params;

	return instance
		.post(`tags/${roomId}/create`, { ...options, json: body, })
		.json();
};

export const update = async (
	params: UpdateTagRequestParams,
	options?: globalThis.RequestInit
): UpdateTagResponseData => {
	const { id, roomId, ...body } = params;

	return instance
		.put(`tags/${roomId}/${id}/update`, { ...options, json: body, })
		.json();
};

export const remove = async (
	params: RemoveTagRequestParams,
	options?: globalThis.RequestInit
): RemoveTagResponseData => {
	const { roomId, id, } = params;

	return instance.delete(`tags/${roomId}/${id}/remove`, options).json();
};
