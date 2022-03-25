import { ID } from "@/interfaces/common";
import {
	CreateEditGroupRequest,
	DeleteGroupRequest,
} from "@/interfaces/requests";
import {
	CreateGroupResponse,
	DeleteGroupResponse,
	EditGroupResponse,
	TaskGroupsResponse,
} from "@/interfaces/response";
import { instance } from "./instance";

export const getTaskGroupsApi = async (
	roomId: ID
): Promise<TaskGroupsResponse> => {
	const response = await instance.get(`/groups/${roomId}`);

	return response.data;
};

export const createTaskGroupApi = async ({
	name,
	roomId,
	mainColor,
	secondColor,
}: CreateEditGroupRequest): Promise<CreateGroupResponse> => {
	const response = await instance.put(`/groups/${roomId}/new`, {
		name,
		mainColor,
		secondColor,
	});

	return response.data;
};

export const deleteGroupApi = async ({
	roomId,
	id,
}: DeleteGroupRequest): Promise<DeleteGroupResponse> => {
	const response = await instance.delete(`/groups/${roomId}/${id}/delete`);
	return response.data;
};

export const editGroupApi = async ({
	id,
	roomId,
	...data
}: CreateEditGroupRequest): Promise<EditGroupResponse> => {
	const response = await instance.post(`/groups/${roomId}/${id}/edit`, data);
	return response.data;
};
