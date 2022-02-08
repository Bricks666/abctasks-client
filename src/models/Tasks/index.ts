import { createGroupsMap } from "./../../utils/createGroupsMap";
import { combine, createDomain } from "effector-logger";
import { DateType, HEX } from "../../interfaces/common";
import {
	CreateTaskResponse,
	TaskGroupsResponse,
	TasksProgressResponse,
	TasksResponse,
} from "../../interfaces/response";
import { combineProgressAndGroup, combineTaskAndGroup } from "../../utils";
import { TaskRequest } from "../../interfaces/requests";

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
export interface TaskGroup {
	readonly id: number;
	readonly name: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export interface TaskGroupsMap {
	[id: number]: TaskGroup;
}

export interface TaskProgressStructure {
	readonly groupId: number;
	readonly completedCount: number;
	readonly totalCount: number;
}

export interface TaskProgressWithGroup
	extends Omit<TaskProgressStructure, "groupId">,
		TaskGroup {}

export type StatusNamesStore = {
	readonly [key in keyof GroupedByStatusTasksStore]: TaskStatus;
};

export const TasksDomain = createDomain("TasksDomain");

export const $Tasks = TasksDomain.createStore<TaskStructure[]>([], {
	name: "Tasks",
});
export const $LoadingTasks = TasksDomain.createStore<boolean>(false, {
	name: "LoadingTasks",
});
export const $StatusNamesStore = TasksDomain.createStore<StatusNamesStore>(
	{
		done: "Done",
		inProgress: "In Progress",
		needReview: "Review",
		ready: "Ready",
	},
	{ name: "GroupNameStore" }
);
export const $TaskGroups = TasksDomain.createStore<TaskGroup[]>([], {
	name: "TaskGroups",
});
export const $TaskGroupsMap = combine<TaskGroup[], TaskGroupsMap>(
	$TaskGroups,
	createGroupsMap
);
export const $TasksWidthGroups = combine(
	$Tasks,
	$TaskGroupsMap,
	combineTaskAndGroup
);
export const $TasksProgress = TasksDomain.createStore<TaskProgressStructure[]>(
	[],
	{
		name: "TasksProgress",
	}
);
export const $LoadingTasksProgress = TasksDomain.createStore<boolean>(false, {
	name: "LoadingTasksProgress",
});
export const $TasksProgressWithGroups = combine(
	$TasksProgress,
	$TaskGroupsMap,
	combineProgressAndGroup
);

const createGrouper = (status: TaskStatus) => {
	return (state: TaskWithGroup[]) => {
		return state.filter((task) => task.status === status);
	};
};
/* Может не стоит комбинировать в один объект */
export const $GroupedByStatusTasksStore = combine<
	TaskWithGroup[],
	GroupedByStatusTasksStore
>($TasksWidthGroups, (tasks) => ({
	done: createGrouper("Done")(tasks),
	inProgress: createGrouper("In Progress")(tasks),
	ready: createGrouper("Ready")(tasks),
	needReview: createGrouper("Review")(tasks),
}));

export const loadTasksFx = TasksDomain.createEffect<void, TasksResponse>(
	"loadTasksFx"
);
export const loadTasksProgressFx = TasksDomain.createEffect<
	void,
	TasksProgressResponse
>("loadTasksProgress");
export const loadTaskGroupsFx = TasksDomain.createEffect<
	void,
	TaskGroupsResponse
>("loadTaskGroupsFx");
export const createTaskFx = TasksDomain.createEffect<
	TaskRequest,
	CreateTaskResponse
>("createTaskFx");

export const loadTasks = TasksDomain.createEvent("loadTasks");
export const loadTasksProgress = TasksDomain.createEvent("loadTasksProgress");
export const loadTaskGroups = TasksDomain.createEvent("loadTaskGroups");
export const createTask =
	TasksDomain.createEvent<TaskRequest>("createTaskEvent");
