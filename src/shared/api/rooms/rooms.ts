import { AccessOptions, fetcher } from '@/shared/lib';
import { StandardResponse } from '@/shared/types';
import {
	AddUserRoomRequest,
	CreateRoomRequest,
	ExitRoomRequest,
	RemoveRoomRequest,
	Room,
	UpdateRoomRequest
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

export const create = async ({ accessToken, ...body }: CreateRoomRequest) => {
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
}: UpdateRoomRequest) => {
	return roomsFetcher.put<StandardResponse<Room>>({
		path: {
			url: [id, 'update'],
		},
		accessToken,
		body,
	});
};

export const remove = async ({ id, accessToken, }: RemoveRoomRequest) => {
	return roomsFetcher.delete<StandardResponse<boolean>>({
		path: {
			url: [id, 'remove'],
		},
		accessToken,
	});
};

export const addUser = async ({
	id,
	userId,
	accessToken,
}: AddUserRoomRequest) => {
	return roomsFetcher.put<StandardResponse<boolean>>({
		path: {
			url: [id, 'exit'],
		},
		body: {
			userId,
		},
		accessToken,
	});
};

export const exit = async ({ id, accessToken, }: ExitRoomRequest) => {
	return roomsFetcher.put<StandardResponse<boolean>>({
		path: {
			url: [id, 'exit'],
		},
		body: {},
		accessToken,
	});
};
