import { CreateGroupRequest } from "@/interfaces/requests";
import { CreateGroupResponse, TaskGroupsResponse } from "@/interfaces/response";
import { instance } from "./instance";

export const getTaskGroupsApi = async (): Promise<TaskGroupsResponse> => {
	const response = await instance.get("/groups");

	return response.data;
};

export const createTaskGroupApi = async ({
	name,
	mainColor,
	secondColor,
}: CreateGroupRequest): Promise<CreateGroupResponse> => {
	const response = await instance.put("/groups/new", {
		name,
		mainColor,
		secondColor,
	});

	return response.data;
};
