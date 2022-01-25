import { instance } from "./instance";
import { TasksProgressResponse, TasksResponse } from "../interfaces/response";

export const getTasksProgress = async (): Promise<TasksProgressResponse> => {
	const response = await instance.get("/todos/progress");
	return response.data;
};
export const getTasks = async (): Promise<TasksResponse> => {
	const response = await instance.get("/todos/");
	return response.data;
};
