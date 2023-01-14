import { fetcher } from '@/shared/lib';
import { StandardResponse } from '@/shared/types';
import {
	GetTaskParams,
	CreateTaskParams,
	UpdateTaskParams,
	RemoveTaskParams,
	Task,
	GetTasksParams
} from './types';

const tasksFetcher = fetcher.create({
	baseURL: 'tasks',
});

export const getAllInRoom = async ({ roomId, ...query }: GetTasksParams) => {
	return tasksFetcher.get<StandardResponse<Task[]>>({
		path: {
			url: roomId,
			query,
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
