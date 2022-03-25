import { ID } from "../common";

export interface TaskProgressResponse {
	readonly groupId: ID;
	readonly totalCount: number;
	readonly doneCount: number;
}

export interface TasksProgressResponse {
	readonly tasksProgress: TaskProgressResponse[];
}

export interface ChangeProgressResponse {
	readonly groupId: ID;
	readonly progress: TaskProgressResponse;
}
