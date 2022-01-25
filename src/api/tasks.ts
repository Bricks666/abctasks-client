import { instance } from "./instance";
import {
	TaskGroupsResponse,
	TasksProgressResponse,
	TasksResponse,
} from "../interfaces/response";

export const getTasks = async (): Promise<TasksResponse> => {
	const response = await instance.get("/todos/");
	return response.data;
};

export const getTasksProgress = async (): Promise<TasksProgressResponse> => {
	const response = await instance.get("/todos/progress");
	return response.data;
};

export const getTaskGroups = async (): Promise<TaskGroupsResponse> => {
	const response = await instance.get("/todos/groups");

	return response.data;
};
