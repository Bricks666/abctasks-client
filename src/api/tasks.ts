import { TaskRequest, EditTaskRequest } from "@/interfaces/requests";
import { instance } from "./instance";
import {
	TaskGroupsResponse,
	CreateTaskResponse,
	TasksProgressResponse,
	TasksResponse,
	DeleteTaskResponse,
} from "@/interfaces/response";

export const getTasksApi = async (): Promise<TasksResponse> => {
	const response = await instance.get("/todos/");
	return response.data;
};

export const getTasksProgressApi = async (): Promise<TasksProgressResponse> => {
	const response = await instance.get("/todos/progress");
	return response.data;
};

export const getTaskGroupsApi = async (): Promise<TaskGroupsResponse> => {
	const response = await instance.get("/todos/groups");

	return response.data;
};

export const createTaskApi = async (
	createTask: TaskRequest
): Promise<CreateTaskResponse> => {
	const response = await instance.put("/todos/new", createTask);

	return response.data;
};

export const editTaskApi = async ({
	id,
	...editTask
}: EditTaskRequest): Promise<CreateTaskResponse> => {
	const response = await instance.post(`/todos/${id}/edit`, editTask);

	return response.data;
};

export const deleteTaskApi = async (
	id: number
): Promise<DeleteTaskResponse> => {
	const response = await instance.delete(`/todos/${id}/delete`);

	return response.data;
};
