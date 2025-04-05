import { instance } from '../request';

import {
	CreateRoomRequestParams,
	CreateRoomResponseData,
	GetRoomRequestParams,
	GetRoomsResponseData,
	RemoveRoomRequestParams,
	RemoveRoomResponseData,
	UpdateRoomRequestParams,
	UpdateRoomResponseData
} from './types';

export const getAll = async (
	options?: globalThis.RequestInit
): GetRoomsResponseData => {
	return instance.get('rooms', options).json();
};

export const getOne = async (
	params: GetRoomRequestParams,
	options?: globalThis.RequestInit
) => {
	const { roomId, } = params;

	return instance.get(`rooms/${roomId}`, options).json();
};

export const create = async (
	params: CreateRoomRequestParams,
	options?: globalThis.RequestInit
): CreateRoomResponseData => {
	return instance
		.post('rooms/create', {
			...options,
			json: params,
		})
		.json();
};

export const update = async (
	params: UpdateRoomRequestParams,
	options?: globalThis.RequestInit
): UpdateRoomResponseData => {
	const { roomId, ...body } = params;
	return instance
		.put(`rooms/${roomId}/update`, {
			...options,
			json: body,
		})
		.json();
};

export const remove = async (
	params: RemoveRoomRequestParams,
	options?: globalThis.RequestInit
): RemoveRoomResponseData => {
	const { roomId, } = params;

	return instance.delete(`rooms/${roomId}/remove`, options).json();
};
