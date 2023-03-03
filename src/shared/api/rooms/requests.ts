import { InRoomParams, StandardResponse } from '@/shared/types';
import { instance } from '../request';
import { CreateRoomParams, Room, UpdateRoomParams } from './types';

export const getAll = async () => {
	return instance.get('rooms').json<StandardResponse<Room[]>>();
};

export const getOne = async ({ roomId, }: InRoomParams) => {
	return instance.get(`rooms/${roomId}`).json<StandardResponse<Room>>();
};

export const create = async (body: CreateRoomParams) => {
	return instance
		.post('rooms/create', {
			json: body,
		})
		.json<StandardResponse<Room>>();
};

export const update = async ({ roomId, ...body }: UpdateRoomParams) => {
	return instance
		.put(`rooms/${roomId}/update`, {
			json: body,
		})
		.json<StandardResponse<Room>>();
};

export const remove = async ({ roomId, }: InRoomParams) => {
	return instance
		.delete(`rooms/${roomId}/remove`)
		.json<StandardResponse<boolean>>();
};
