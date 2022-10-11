import { StandardResponse } from '@/interfaces/response/standardResponse';
import {
	CreateRoomRequest,
	RoomResponse,
	UpdateRoomRequest,
} from '@/models/rooms';
import { instance } from './instance';

export const getAll = async () => {
	const response = await instance.get<StandardResponse<RoomResponse[]>>(
		'/rooms'
	);

	return response.data;
};

export const getOne = async (id: number) => {
	const response = await instance.get<StandardResponse<RoomResponse>>(
		`/rooms/${id}`
	);

	return response.data;
};

export const create = async (room: CreateRoomRequest) => {
	const response = await instance.post<StandardResponse<RoomResponse>>(
		'/rooms/create',
		room
	);

	return response.data;
};

export const update = async ({ roomId, ...data }: UpdateRoomRequest) => {
	const response = await instance.put(`/rooms/${roomId}/update`, data);

	return response.data;
};

export const remove = async (roomId: number) => {
	const response = await instance.delete<StandardResponse<boolean>>(
		`/rooms/${roomId}/delete`
	);

	return response.data;
};
