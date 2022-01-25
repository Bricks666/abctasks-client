import { TaskStatus } from "../../models/Tasks";
import { HEX } from "../common";

export interface TasksResponse {
	readonly tasks: TaskResponse[];
}

export interface TaskResponse {
	readonly content: string;
	readonly date: string;
  readonly groupName: string;
	readonly groupMainColor: HEX;
	readonly groupSecondColor: HEX;
	readonly login: string;
	readonly photo: null | string;
	readonly status: TaskStatus;
	readonly todoId: number;
}
