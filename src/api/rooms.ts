import { StandardResponse } from '@/types/response';
import { CreateRoomRequest, Room, UpdateRoomRequest } from '@/models/rooms';
import { instance } from './instance';

export const getAll = async () => {
	const response = await instance.get<StandardResponse<Room[]>>('/rooms');
	return response.data;
};

export const getOne = async (id: number) => {
	const response = await instance.get<StandardResponse<Room>>(`/rooms/${id}`);
	return response.data;
};

export const create = async (room: CreateRoomRequest) => {
	const response = await instance.post<StandardResponse<Room>>(
		'/rooms/create',
		room
	);
	return response.data;
};

export const update = async ({ id: roomId, ...body }: UpdateRoomRequest) => {
	const response = await instance.put(`/rooms/${roomId}/update`, body);
	return response.data;
};

export const remove = async (roomId: number) => {
	const response = await instance.delete<StandardResponse<boolean>>(
		`/rooms/${roomId}/remove`
	);
	return response.data;
};
