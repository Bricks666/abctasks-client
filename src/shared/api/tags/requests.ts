import { StandardResponse } from '@/shared/types';
import { instance } from '../request';
import {
	GetTagParams,
	CreateTagParams,
	UpdateTagParams,
	RemoveTagParams,
	Tag
} from './types';

export const getAll = async (roomId: number) => {
	return instance.get(`tags/${roomId}`).json<StandardResponse<Tag[]>>();
};

export const getOne = async ({ roomId, id, }: GetTagParams) => {
	return instance.get(`tags/${roomId}/${id}`).json<StandardResponse<Tag>>();
};

export const create = async ({ roomId, ...body }: CreateTagParams) => {
	return instance
		.post(`tags/${roomId}/create`, { json: body, })
		.json<StandardResponse<Tag>>();
};

export const update = async ({ id, roomId, ...body }: UpdateTagParams) => {
	return instance
		.put(`tags/${roomId}/${id}/update`, {
			json: body,
		})
		.json<StandardResponse<Tag>>();
};

export const remove = async ({ roomId, id, }: RemoveTagParams) => {
	return instance
		.delete(`tags/${roomId}/${id}/remove`)
		.json<StandardResponse<boolean>>();
};
