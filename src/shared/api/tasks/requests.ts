import { fetcher } from '@/shared/lib';
import { StandardResponse } from '@/shared/types';
import {
	GetTaskParams,
	CreateTaskParams,
	UpdateTaskParams,
	RemoveTaskParams,
	Task
} from './types';

const tasksFetcher = fetcher.create({
	baseURL: 'tasks',
});

export const getAll = async (roomId: number) => {
	return tasksFetcher.get<StandardResponse<Task[]>>({
		path: {
			url: roomId,
		},
	});
};

export const getOne = async ({ roomId, id, }: GetTaskParams) => {
	return tasksFetcher.get<StandardResponse<Task>>({
		path: {
			url: [roomId, id],
		},
	});
};

export const create = async ({
	roomId,
	accessToken,
	...body
}: CreateTaskParams) => {
	return tasksFetcher.post<StandardResponse<Task>>({
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
}: UpdateTaskParams) => {
	return tasksFetcher.put<StandardResponse<Task>>({
		accessToken,
		path: {
			url: [roomId, id, 'update'],
		},
		body,
	});
};

export const remove = async ({ roomId, id, accessToken, }: RemoveTaskParams) => {
	return tasksFetcher.delete<StandardResponse<boolean>>({
		accessToken,
		path: {
			url: [roomId, id, 'remove'],
		},
	});
};
