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
import { combine } from "effector";
import { createDomain } from "effector-logger";
import { TaskGroup, TaskGroupsMap } from "./types";
import { createGroupsMap } from "./utils";

export const GroupsDomain = createDomain("GroupsDomain");
export const $TaskGroups = GroupsDomain.store<TaskGroup[]>([], {
	name: "TaskGroups",
});
export const $TaskGroupsMap = combine<TaskGroup[], TaskGroupsMap>(
	$TaskGroups,
	createGroupsMap
);

export const loadTaskGroupsFx = GroupsDomain.effect<ID, TaskGroupsResponse>(
	"loadTaskGroupsFx"
);
export const createGroupFx = GroupsDomain.effect<
	CreateEditGroupRequest,
	CreateGroupResponse
>("createGroupFx");
export const deleteGroupFx = GroupsDomain.effect<
	DeleteGroupRequest,
	DeleteGroupResponse
>("deleteGroupFx");
export const editGroupFx = GroupsDomain.effect<
	CreateEditGroupRequest,
	EditGroupResponse
>("editGroupFx");

export const loadTaskGroups = GroupsDomain.event<ID>("loadTaskGroups");
export const createGroup =
	GroupsDomain.event<CreateEditGroupRequest>("createGroupEvent");
export const deleteGroup =
	GroupsDomain.event<DeleteGroupRequest>("deleteGroupEvent");
export const editGroup =
	GroupsDomain.event<CreateEditGroupRequest>("editGroupEvent");
export const resetGroups = GroupsDomain.event("resetGroups");
