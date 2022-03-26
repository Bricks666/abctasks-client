import { TaskGroupResponse } from "@/interfaces/response";
import { TaskGroup, TaskGroupsMap } from "./types";

export const createGroupsMap = (groups: TaskGroup[]): TaskGroupsMap => {
	return Object.values(groups).reduce<TaskGroupsMap>((map, group) => {
		map[group.id] = group;
		return map;
	}, {});
};

export const toValidTaskGroup = (taskGroup: TaskGroupResponse): TaskGroup => {
	return {
		id: taskGroup.groupId,
		roomId: taskGroup.roomId,
		name: taskGroup.groupName,
		mainColor: taskGroup.groupMainColor,
		secondColor: taskGroup.groupSecondColor,
	};
};
