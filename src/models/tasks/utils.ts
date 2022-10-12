import { Task, TaskResponse } from './types';

export const converter = (task: TaskResponse): Task => {
	return {
		id: +task.taskId,
		roomId: +task.roomId,
		status: task.status,
		author: {
			name: 'as',
			photo: null,
		},
		content: task.content,
		groupId: task.groupId,
		createdAt: task.createdAt,
		commentCount: 0,
	};
};
