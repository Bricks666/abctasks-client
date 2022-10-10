import { HEX, ID } from '../common';

export interface TaskGroupResponse {
	readonly groupId: ID;
	readonly roomId: ID;
	readonly groupName: string;
	readonly groupMainColor: HEX;
	readonly groupSecondColor: HEX;
}

export interface TaskGroupsResponse {
	readonly groups: TaskGroupResponse[];
}

export interface CreateGroupResponse {
	readonly group: TaskGroupResponse;
}

export interface DeleteGroupResponse {
	readonly groupId: ID;
}

export interface EditGroupResponse {
	readonly group: TaskGroupResponse;
}
