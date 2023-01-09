import { fetcher } from '@/shared/lib';
import { StandardResponse } from '@/shared/types';
import {
	CreateGroupParams,
	UpdateGroupParams,
	RemoveGroupParams,
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
}: CreateGroupParams) => {
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
}: UpdateGroupParams) => {
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
}: RemoveGroupParams) => {
	return groupsFetcher.delete<StandardResponse<boolean>>({
		accessToken,
		path: {
			url: [roomId, id, 'remove'],
		},
	});
};
