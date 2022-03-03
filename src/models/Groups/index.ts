import { CreateEditGroupRequest } from "@/interfaces/requests";
import {
	CreateGroupResponse,
	DeleteGroupResponse,
	EditGroupResponse,
	TaskGroupsResponse,
} from "@/interfaces/response";
import { combine } from "effector";
import { createDomain } from "effector-logger";
import { TaskGroup, TaskGroupsMap } from "./types";
import { createGroupsMap } from "./utils";

export const GroupsDomain = createDomain("GroupsDomain");
export const $TaskGroups = GroupsDomain.createStore<TaskGroup[]>([], {
	name: "TaskGroups",
});
export const $TaskGroupsMap = combine<TaskGroup[], TaskGroupsMap>(
	$TaskGroups,
	createGroupsMap
);

export const loadTaskGroupsFx = GroupsDomain.createEffect<
	void,
	TaskGroupsResponse
>("loadTaskGroupsFx");
export const createGroupFx = GroupsDomain.createEffect<
CreateEditGroupRequest,
	CreateGroupResponse
>("createGroupFx");
export const deleteGroupFx = GroupsDomain.createEffect<
	number,
	DeleteGroupResponse
>("deleteGroupFx");
export const editGroupFx = GroupsDomain.createEffect<
CreateEditGroupRequest,
	EditGroupResponse
>("editGroupFx");

export const loadTaskGroups = GroupsDomain.createEvent("loadTaskGroups");
export const createGroup =
	GroupsDomain.createEvent<CreateEditGroupRequest>("createGroupEvent");
export const deleteGroup = GroupsDomain.createEvent<number>("deleteGroupEvent");
export const editGroup =
	GroupsDomain.createEvent<CreateEditGroupRequest>("editGroupEvent");
