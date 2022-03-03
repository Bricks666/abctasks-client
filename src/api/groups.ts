import { CreateEditGroupRequest } from "@/interfaces/requests";
import {
	CreateGroupResponse,
	DeleteGroupResponse,
	EditGroupResponse,
	TaskGroupsResponse,
} from "@/interfaces/response";
import { instance } from "./instance";

export const getTaskGroupsApi = async (): Promise<TaskGroupsResponse> => {
	const response = await instance.get("/groups");

	return response.data;
};

export const createTaskGroupApi = async ({
	name,
	mainColor,
	secondColor,
}: CreateEditGroupRequest): Promise<CreateGroupResponse> => {
	const response = await instance.put("/groups/new", {
		name,
		mainColor,
		secondColor,
	});

	return response.data;
};

export const deleteGroupApi = async (
	groupId: number
): Promise<DeleteGroupResponse> => {
	const response = await instance.delete(`/groups/${groupId}/delete`);
	return response.data;
};

export const editGroupApi = async ({
	id,
	...data
}: CreateEditGroupRequest): Promise<EditGroupResponse> => {
	const response = await instance.post(`/groups/${id}/edit`, data);
	return response.data;
};
