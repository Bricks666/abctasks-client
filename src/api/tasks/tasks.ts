import { fetcher } from '@/packages';
import { Task } from '@/models';
import { StandardResponse } from '@/types';
import {
	GetTaskRequest,
	CreateTaskRequest,
	UpdateTaskRequest,
	RemoveTaskRequest,
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

export const getOne = async ({ roomId, id }: GetTaskRequest) => {
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
}: CreateTaskRequest) => {
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
}: UpdateTaskRequest) => {
	return tasksFetcher.put<StandardResponse<Task>>({
		accessToken,
		path: {
			url: [roomId, id, 'update'],
		},
		body,
	});
};

export const remove = async ({
	roomId,
	id,
	accessToken,
}: RemoveTaskRequest) => {
	return tasksFetcher.delete<StandardResponse<boolean>>({
		accessToken,
		path: {
			url: [roomId, id, 'remove'],
		},
	});
};
