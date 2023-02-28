import { fetcher } from '@/shared/lib';
import { StandardResponse } from '@/shared/types';
import {
	GetTagParams,
	CreateTagParams,
	UpdateTagParams,
	RemoveTagParams,
	Tag
} from './types';

const tagsFetcher = fetcher.create({
	baseURL: 'tags',
});

export const getAll = async (roomId: number) => {
	return tagsFetcher.get<StandardResponse<Tag[]>>({
		path: {
			url: roomId,
		},
	});
};

export const getOne = async ({ roomId, id, }: GetTagParams) => {
	return tagsFetcher.get<StandardResponse<Tag>>({
		path: {
			url: [roomId, id],
		},
	});
};

export const create = async ({
	roomId,
	accessToken,
	...body
}: CreateTagParams) => {
	return tagsFetcher.post<StandardResponse<Tag>>({
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
}: UpdateTagParams) => {
	return tagsFetcher.put<StandardResponse<Tag>>({
		accessToken,
		path: {
			url: [roomId, id, 'update'],
		},
		body,
	});
};

export const remove = async ({ roomId, accessToken, id, }: RemoveTagParams) => {
	return tagsFetcher.delete<StandardResponse<boolean>>({
		accessToken,
		path: {
			url: [roomId, id, 'remove'],
		},
	});
};
