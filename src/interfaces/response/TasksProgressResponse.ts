import { HEX } from "../common";

export interface TaskProgressResponse {
	readonly groupName: string;
	readonly groupMainColor: HEX;
	readonly groupSecondColor: HEX;
	readonly totalCount: number;
	readonly doneCount: number;
}

export interface TasksProgressResponse {
	readonly tasksProgress: TaskProgressResponse[];
}
