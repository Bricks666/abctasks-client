import { StandardResponse } from '@/interfaces/response';
import {
	CreateTaskRequest,
	RemoveTaskRequest,
	GetTaskRequest,
	TaskResponse,
	UpdateTaskRequest,
} from '@/models/tasks';
import { instance } from './instance';

export const getAll = async (roomId: number) => {
	const response = await instance.get<StandardResponse<TaskResponse[]>>(
		`/tasks/${roomId}`
	);
	return response.data;
};

export const getOne = async ({ roomId, id }: GetTaskRequest) => {
	const response = await instance.get<StandardResponse<TaskResponse>>(
		`/tasks/${roomId}/${id}`
	);
	return response.data;
};

export const create = async ({ roomId, ...createTask }: CreateTaskRequest) => {
	const response = await instance.post<StandardResponse<TaskResponse>>(
		`/tasks/${roomId}/create`,
		createTask
	);

	return response.data;
};

export const update = async ({
	id,
	roomId,
	...editTask
}: UpdateTaskRequest) => {
	const response = await instance.put<StandardResponse<TaskResponse>>(
		`/tasks/${roomId}/${id}/update`,
		editTask
	);

	return response.data;
};

export const remove = async ({ roomId, id }: RemoveTaskRequest) => {
	const response = await instance.delete<StandardResponse<boolean>>(
		`/tasks/${roomId}/${id}/delete`
	);

	return response.data;
};
