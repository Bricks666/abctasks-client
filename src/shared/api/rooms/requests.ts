import { AccessOptions, fetcher } from '@/shared/lib';
import { InRoomParams, StandardResponse } from '@/shared/types';
import { User } from '../auth';
import {
	AddUserRoomParams,
	CreateRoomParams,
	ExitRoomParams,
	RemoveRoomParams,
	Room,
	UpdateRoomParams
} from './types';

const roomsFetcher = fetcher.create({
	baseURL: 'rooms',
});

export const getAll = async ({ accessToken, }: AccessOptions) => {
	return roomsFetcher.get<StandardResponse<Room[]>>({
		accessToken,
		path: {
			url: '',
		},
	});
};

export const getOne = async (id: number) => {
	return roomsFetcher.get<StandardResponse<Room>>({
		path: {
			url: id,
		},
	});
};

export const create = async ({ accessToken, ...body }: CreateRoomParams) => {
	return roomsFetcher.post<StandardResponse<Room>>({
		path: {
			url: 'create',
		},
		accessToken,
		body,
	});
};

export const update = async ({
	id,
	accessToken,
	...body
}: UpdateRoomParams) => {
	return roomsFetcher.put<StandardResponse<Room>>({
		path: {
			url: [id, 'update'],
		},
		accessToken,
		body,
	});
};

export const remove = async ({ id, accessToken, }: RemoveRoomParams) => {
	return roomsFetcher.delete<StandardResponse<boolean>>({
		path: {
			url: [id, 'remove'],
		},
		accessToken,
	});
};

export const getUsers = async ({ roomId, }: InRoomParams) => {
	return roomsFetcher.get<StandardResponse<User[]>>({
		path: {
			url: [roomId, 'users'],
		},
	});
};

export const addUser = async ({
	id,
	userId,
	accessToken,
}: AddUserRoomParams) => {
	return roomsFetcher.put<StandardResponse<User>>({
		path: {
			url: [id, 'add-user'],
		},
		body: {
			userId,
		},
		accessToken,
	});
};

export const exit = async ({ id, accessToken, }: ExitRoomParams) => {
	return roomsFetcher.put<StandardResponse<boolean>>({
		path: {
			url: [id, 'exit'],
		},
		body: {},
		accessToken,
	});
};
