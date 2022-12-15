import { fetcher } from '@/shared/packages';
import { StandardResponse } from '@/shared/types';
import {
	CreateGroupRequest,
	UpdateGroupRequest,
	RemoveGroupRequest,
	Group
} from './types';

const groupsFetcher = fetcher.create({
	baseURL: 'groups',
});

export const getAll = async (roomId: number) => {
	return groupsFetcher.get<StandardResponse<Group[]>>({
		path: {
			url: roomId,
		},
	});
};

export const create = async ({
	roomId,
	accessToken,
	...body
}: CreateGroupRequest) => {
	return groupsFetcher.post<StandardResponse<Group>>({
		accessToken,
		path: {
			url: [roomId, 'create'],
		},
		body,
	});
};

export const update = async ({
	id,
	roomId,
	accessToken,
	...body
}: UpdateGroupRequest) => {
	return groupsFetcher.put<StandardResponse<Group>>({
		accessToken,
		path: {
			url: [roomId, id, 'update'],
		},
		body,
	});
};

export const remove = async ({
	roomId,
	accessToken,
	id,
}: RemoveGroupRequest) => {
	return groupsFetcher.delete<StandardResponse<boolean>>({
		accessToken,
		path: {
			url: [roomId, id, 'remove'],
		},
	});
};
