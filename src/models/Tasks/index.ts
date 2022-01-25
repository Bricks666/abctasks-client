import {
	combine,
	createEffect,
	createEvent,
	createStore,
} from "effector-logger";
import { DateType } from "../../interfaces/common";
import { TasksResponse } from "../../interfaces/response";
import { $TaskGroupsMap, TaskGroup } from "../Group";

export type TaskStatus = "Done" | "Ready" | "Review" | "In Progress";

export interface TaskAuthor {
	readonly name: string;
	readonly photo: string | null;
}

export interface TaskStructure {
	readonly id: number;
	readonly groupId: number;
	readonly status: TaskStatus;
	readonly content: string;
	readonly commentCount: number;
	readonly addedDate: DateType;
	readonly author: TaskAuthor;
}
export interface TaskWithGroup extends Omit<TaskStructure, "groupId"> {
	readonly group: TaskGroup;
}

export interface GroupedByStatusTasksStore {
	readonly ready: TaskWithGroup[];
	readonly inProgress: TaskWithGroup[];
	readonly needReview: TaskWithGroup[];
	readonly done: TaskWithGroup[];
}

export interface TasksStore {
	readonly tasks: TaskStructure[];
	readonly isLoading: boolean;
}

export type StatusNamesStore = {
	[key in keyof GroupedByStatusTasksStore]: TaskStatus;
};

export const $Tasks = createStore<TaskStructure[]>([], { name: "Tasks" });

export const $TasksWidthGroups = combine(
	$Tasks,
	$TaskGroupsMap,
	(tasks, groups) =>
		tasks.map<TaskWithGroup>((task) => {
			const group = groups[task.groupId];
			return {
				id: task.id,
				author: task.author,
				content: task.content,
				status: task.status,
				commentCount: task.commentCount,
				addedDate: task.addedDate,
				group: group,
			};
		})
);

const createGrouper = (status: TaskStatus) => {
	return (state: TaskWithGroup[]) => {
		return state.filter((task) => task.status === status);
	};
};

export const $GroupedByStatusTasksStore = combine<
	TaskWithGroup[],
	GroupedByStatusTasksStore
>($TasksWidthGroups, (tasks) => ({
	done: createGrouper("Done")(tasks),
	inProgress: createGrouper("In Progress")(tasks),
	ready: createGrouper("Ready")(tasks),
	needReview: createGrouper("Review")(tasks),
}));

export const loadTasks = createEvent("loadTasks");

export const loadTasksFx = createEffect<void, TasksResponse>("loadTasksFx");

export const $TasksStore = combine<TasksStore>({
	tasks: $Tasks,
	isLoading: loadTasksFx.pending,
});

export const $MayLoadTasks = createStore<boolean>(true, {
	name: "MayLoadTasks",
});

export const $StatusNamesStore = createStore<StatusNamesStore>(
	{
		done: "Done",
		inProgress: "In Progress",
		needReview: "Review",
		ready: "Ready",
	},
	{ name: "GroupNameStore" }
);
