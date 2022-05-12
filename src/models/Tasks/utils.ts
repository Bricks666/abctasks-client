import { TaskStructure } from "./types";
import { TaskResponse } from "@/interfaces/response";

export const toValidTask = (task: TaskResponse): TaskStructure => {
	return {
		id: +task.todoId,
		roomId: +task.roomId,
		status: +task.status,
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
