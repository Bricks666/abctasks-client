import {
	TaskRequest,
	EditTaskRequest,
	DeleteTaskRequest,
} from "@/interfaces/requests";
import { instance } from "./instance";
import {
	CreateTaskResponse,
	TasksResponse,
	DeleteTaskResponse,
} from "@/interfaces/response";
import { ID } from "@/interfaces/common";

export const getTasksApi = async (roomId: ID): Promise<TasksResponse> => {
	const response = await instance.get(`/todos/${roomId}`);
	return response.data;
};

export const createTaskApi = async ({
	roomId,
	...createTask
}: TaskRequest): Promise<CreateTaskResponse> => {
	const response = await instance.put(`/todos/${roomId}/new`, createTask);

	return response.data;
};

export const editTaskApi = async ({
	id,
	roomId,
	...editTask
}: EditTaskRequest): Promise<CreateTaskResponse> => {
	const response = await instance.post(`/todos/${roomId}/${id}/edit`, editTask);

	return response.data;
};

export const deleteTaskApi = async ({
	roomId,
	id,
}: DeleteTaskRequest): Promise<DeleteTaskResponse> => {
	const response = await instance.delete(`/todos/${roomId}/${id}/delete`);

	return response.data;
};
