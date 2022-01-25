import {
	combine,
	createEffect,
	createEvent,
	createStore,
} from "effector-logger";
import { DateType, GroupStructure } from "../../interfaces/common";
import { TasksResponse } from "../../interfaces/response";

export type TaskStatus = "Done" | "Ready" | "Review" | "In Progress";

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

export interface GroupedByStatusTasksStore {
	readonly ready: TaskStructure[];
	readonly inProgress: TaskStructure[];
	readonly needReview: TaskStructure[];
	readonly done: TaskStructure[];
}

export interface TasksStore {
	readonly tasks: TaskStructure[];
	readonly isLoading: boolean;
}

export type GroupNamesStore = {
	[key in keyof GroupedByStatusTasksStore]: TaskStatus;
};

export const $Tasks = createStore<TaskStructure[]>([], { name: "Tasks" });

export const addTask = createEvent<TaskStructure>("addTask");
export const changeTaskGroup =
	createEvent<{ taskID: number; newGroup: GroupStructure }>("changeTaskStatus");

export const loadTasksFx = createEffect<void, TasksResponse>("loadTasks");

const createGrouper = (status: TaskStatus) => {
	return (state: TaskStructure[]) => {
		return state.filter((task) => task.status === status);
	};
};

export const $ReadyTasks = $Tasks.map(createGrouper("Ready"));
export const $InProgressTasks = $Tasks.map(createGrouper("In Progress"));
export const $NeedReviewTasks = $Tasks.map(createGrouper("Review"));
export const $DoneTasks = $Tasks.map(createGrouper("Done"));

export const $GroupedByStatusTasksStore = combine<GroupedByStatusTasksStore>({
	ready: $ReadyTasks,
	inProgress: $InProgressTasks,
	needReview: $NeedReviewTasks,
	done: $DoneTasks,
});


export const $TasksStore = combine<TasksStore>({
	tasks: $Tasks,
	isLoading: loadTasksFx.pending,
});

export const $GroupNamesStore = createStore<GroupNamesStore>(
	{
		done: "Done",
		inProgress: "In Progress",
		needReview: "Review",
		ready: "Ready",
	},
	{ name: "GroupNameStore" }
);
