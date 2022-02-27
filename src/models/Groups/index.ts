import { CreateGroupRequest } from "@/interfaces/requests";
import { CreateGroupResponse, TaskGroupsResponse } from "@/interfaces/response";
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
	CreateGroupRequest,
	CreateGroupResponse
>("createGroupFx");

export const loadTaskGroups = GroupsDomain.createEvent("loadTaskGroups");
export const createGroup =
	GroupsDomain.createEvent<CreateGroupRequest>("createGroupEvent");
