import {
	TaskGroup,
	TaskGroupsMap,
	TaskProgressStructure,
	TaskProgressWithGroup,
	TaskStructure,
	TaskWithGroup,
} from "./types";
import {
	TaskGroupResponse,
	TaskProgressResponse,
	TaskResponse,
} from "@/interfaces/response";

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

export const createGroupsMap = (groups: TaskGroup[]): TaskGroupsMap => {
	return Object.values(groups).reduce<TaskGroupsMap>((map, group) => {
		map[group.id] = group;
		return map;
	}, {});
};

export const toValidTask = (task: TaskResponse): TaskStructure => {
	return {
		id: task.todoId,
		status: task.status,
		author: {
			name: task.login,
			photo: task.photo,
		},
		content: task.content,
		groupId: task.groupId,
		addedDate: task.date,
		commentCount: 0,
	};
};

export const toValidTaskGroup = (taskGroup: TaskGroupResponse): TaskGroup => {
	return {
		id: taskGroup.groupId,
		name: taskGroup.groupName,
		mainColor: taskGroup.groupMainColor,
		secondColor: taskGroup.groupSecondColor,
	};
};

export const toValidTaskProgress = (
	taskProgress: TaskProgressResponse
): TaskProgressStructure => {
	return {
		groupId: taskProgress.groupId,
		totalCount: taskProgress.totalCount,
		completedCount: taskProgress.doneCount,
	};
};
