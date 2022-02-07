import { TaskGroup, TaskGroupsMap } from "../models/Tasks";

export const createGroupsMap = (groups: TaskGroup[]): TaskGroupsMap => {
	return Object.values(groups).reduce<TaskGroupsMap>((map, group) => {
		map[group.id] = group;
		return map;
	}, {});
};
