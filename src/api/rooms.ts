import { ID } from '@/interfaces/common';
import { CreateRoomRequest, EditRoomRequest } from '@/interfaces/requests';
import { RoomsResponse } from '@/interfaces/response';
import { instance } from './instance';

export const getRoomsApi = async (): Promise<RoomsResponse> => {
	const response = await instance.get('/rooms');

	return response.data;
};

export const createRoomApi = async (room: CreateRoomRequest) => {
	const response = await instance.put('/rooms/new', room);

	return response.data;
};

export const deleteRoomApi = async (roomId: ID) => {
	const response = await instance.delete(`/rooms/${roomId}/delete`);

	return response.data;
};

export const editRoomApi = async ({ roomId, ...data }: EditRoomRequest) => {
	const response = await instance.post(`/rooms/${roomId}/edit`, data);

	return response.data;
};
