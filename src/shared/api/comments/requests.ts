import { StandardResponse } from '@/shared/types';
import { instance } from '../request';
import {
	BaseCommentParams,
	Comment,
	CreateParams,
	GetOneParams,
	RemoveParams,
	UpdateParams
} from './types';

export const getAll = ({ roomId, taskId, }: BaseCommentParams) => {
	return instance
		.get(`comments/${roomId}/${taskId}`)
		.json<StandardResponse<Comment[]>>();
};

export const getOne = ({ roomId, taskId, id, }: GetOneParams) => {
	return instance
		.get(`comments/${roomId}/${taskId}/${id}`)
		.json<StandardResponse<Comment>>();
};

export const create = ({ roomId, taskId, ...body }: CreateParams) => {
	return instance
		.post(`comments/${roomId}/${taskId}/create`, {
			json: body,
		})
		.json<StandardResponse<Comment>>();
};

export const update = ({ roomId, taskId, id, ...body }: UpdateParams) => {
	return instance
		.put(`comments/${roomId}/${taskId}/${id}/update`, {
			json: body,
		})
		.json<StandardResponse<Comment>>();
};

export const remove = ({ roomId, taskId, id, }: RemoveParams) => {
	return instance
		.delete(`comments/${roomId}/${taskId}/${id}/remove`)
		.json<StandardResponse<boolean>>();
};
