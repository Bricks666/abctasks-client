import { TaskStructure, TaskWithGroup, TaskGroupsMap } from "../models/Tasks";

export const combineTaskAndGroup = (
	tasks: TaskStructure[],
	groups: TaskGroupsMap
) => {
	return tasks.map<TaskWithGroup>((task) => {
		const group = groups[task.groupId];
		return {
			id: task.id,
			author: task.author,
			content: task.content,
			status: task.status,
			commentCount: task.commentCount,
			addedDate: task.addedDate,
			group: group,
		};
	});
};
