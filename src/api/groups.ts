import {
	CreateGroupRequest,
	RemoveGroupRequest,
	Group,
	UpdateGroupRequest,
} from '@/models/groups';
import { StandardResponse } from '@/types/response';
import { instance } from './instance';

export const getAll = async (roomId: number) => {
	const response = await instance.get<StandardResponse<Group[]>>(
		`/groups/${roomId}`
	);
	return response.data;
};

export const create = async ({ roomId, ...body }: CreateGroupRequest) => {
	const response = await instance.post(`/groups/${roomId}/create`, body);
	return response.data;
};

export const update = async ({ id, roomId, ...body }: UpdateGroupRequest) => {
	const response = await instance.put(`/groups/${roomId}/${id}/update`, body);
	return response.data;
};

export const remove = async ({ roomId, id }: RemoveGroupRequest) => {
	const response = await instance.delete(`/groups/${roomId}/${id}/remove`);
	return response.data;
};
