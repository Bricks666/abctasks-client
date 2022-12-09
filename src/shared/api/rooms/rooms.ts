import {
	CreateRoomRequest,
	RemoveRoomRequest,
	UpdateRoomRequest
} from './types';
import { Room } from '@/models';
import { AccessOptions, fetcher } from '@/packages';
import { StandardResponse } from '@/types';

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
