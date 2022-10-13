import { StandardResponse } from '@/types/response';
import {
	CreateTaskRequest,
	RemoveTaskRequest,
	GetTaskRequest,
	Task,
	UpdateTaskRequest,
} from '@/models/tasks';
import { instance } from './instance';

export const getAll = async (roomId: number) => {
	const response = await instance.get<StandardResponse<Task[]>>(
		`/tasks/${roomId}`
	);
	return response.data;
};

export const getOne = async ({ roomId, id }: GetTaskRequest) => {
	const response = await instance.get<StandardResponse<Task>>(
		`/tasks/${roomId}/${id}`
	);
	return response.data;
};

export const create = async ({ roomId, ...body }: CreateTaskRequest) => {
	const response = await instance.post<StandardResponse<Task>>(
		`/tasks/${roomId}/create`,
		body
	);
	return response.data;
};

export const update = async ({ id, roomId, ...body }: UpdateTaskRequest) => {
	const response = await instance.put<StandardResponse<Task>>(
		`/tasks/${roomId}/${id}/update`,
		body
	);
	return response.data;
};

export const remove = async ({ roomId, id }: RemoveTaskRequest) => {
	const response = await instance.delete<StandardResponse<boolean>>(
		`/tasks/${roomId}/${id}/delete`
	);
	return response.data;
};
