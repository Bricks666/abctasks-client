import {
	TaskGroupsMap,
	TaskProgressStructure,
	TaskProgressWithGroup,
} from "../models/Tasks";

export const combineProgressAndGroup = (
	tasksProgress: TaskProgressStructure[],
	groups: TaskGroupsMap
) =>
	tasksProgress.map<TaskProgressWithGroup>((task) => {
		const group = groups[task.groupId];
		return {
			...group,
			totalCount: task.totalCount,
			completedCount: task.completedCount,
		};
	});
