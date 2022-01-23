import {
	combine,
	createEffect,
	createEvent,
	createStore,
} from "effector-logger";
import { DateType } from "../../interfaces/common";

export type TaskStatus = "Done" | "Ready" | "Review" | "Progress";

export interface TaskStructure {
	readonly id: number;
	readonly group: string;
	readonly status: TaskStatus;
	readonly content: string;
	readonly commentCount: number;
	readonly addedDate: DateType;
}

export interface TasksStore {
	readonly tasks: TaskStructure[];
	readonly isLoading: boolean;
}

export const $Tasks = createStore<TaskStructure[]>([], { name: "Tasks" });

export const addTask = createEvent<TaskStructure>("addTask");
export const changeTaskGroup =
	createEvent<{ taskID: number; newGroup: string }>("changeTaskStatus");

export const loadTasksFx = createEffect<void, TaskStructure[]>("loadTasks");

export const $TasksStore = combine<TasksStore>({
	tasks: $Tasks,
	isLoading: loadTasksFx.pending,
});
