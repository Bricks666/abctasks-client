import {
	combine,
	createEffect,
	createEvent,
	createStore,
} from "effector-logger";
import { DateType, GroupStructure } from "../../interfaces/common";

export type TaskStatus = "Done" | "Ready" | "Review" | "Progress";

export interface TaskAuthor {
	readonly name: string;
	readonly photo: string | null;
}

export interface TaskStructure {
	readonly id: number;
	readonly group: GroupStructure;
	readonly status: TaskStatus;
	readonly content: string;
	readonly commentCount: number;
	readonly addedDate: DateType;
	readonly author: TaskAuthor;
}

export interface TasksStore {
	readonly tasks: TaskStructure[];
	readonly isLoading: boolean;
}

export const $Tasks = createStore<TaskStructure[]>([], { name: "Tasks" });

export const addTask = createEvent<TaskStructure>("addTask");
export const changeTaskGroup =
	createEvent<{ taskID: number; newGroup: GroupStructure }>("changeTaskStatus");

export const loadTasksFx = createEffect<void, TaskStructure[]>("loadTasks");

export const $TasksStore = combine<TasksStore>({
	tasks: $Tasks,
	isLoading: loadTasksFx.pending,
});
