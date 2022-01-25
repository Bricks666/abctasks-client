import { TaskResponse } from "../interfaces/response";
import { TaskStructure } from "../models/Tasks";

export const toValidTask = (task: TaskResponse): TaskStructure => {
	return {
		id: task.todoId,
		status: task.status,
		author: {
			name: task.login,
			photo: task.photo,
		},
		content: task.content,
		group: {
			group: task.groupName,
			backgroundColor: task.groupSecondColor,
			textColor: task.groupMainColor,
		},
		addedDate: task.date,
		commentCount: 0,
	};
};
