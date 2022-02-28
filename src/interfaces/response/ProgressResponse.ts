export interface TaskProgressResponse {
	readonly groupId: number;
	readonly totalCount: number;
	readonly doneCount: number;
}

export interface TasksProgressResponse {
	readonly tasksProgress: TaskProgressResponse[];
}

export interface ChangeProgressResponse {
	readonly groupId: number;
	readonly progress: TaskProgressResponse;
}
