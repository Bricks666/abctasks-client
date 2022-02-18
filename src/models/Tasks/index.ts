import { combine, createDomain } from "effector-logger";
import {
	TaskGroupsResponse,
	TasksProgressResponse,
	TasksResponse,
	DeleteTaskResponse,
} from "@/interfaces/response";
import { EditTaskRequest, TaskRequest } from "@/interfaces/requests";
import { CreateTaskResponse } from "@/interfaces/response/CreateTaskResponse";
import { combineProgressAndGroup, combineTaskAndGroup, createGroupsMap } from "./utils";
import { GroupedByStatusTasksStore, StatusNamesStore, TaskGroup, TaskGroupsMap, TaskProgressStructure, TaskStatus, TaskStructure, TaskWithGroup } from "./types";


export const TasksDomain = createDomain("TasksDomain");

export const $Tasks = TasksDomain.createStore<TaskStructure[]>([], {
	name: "Tasks",
});
export const $LoadingTasks = TasksDomain.createStore<boolean>(false, {
	name: "LoadingTasks",
});
export const $StatusNamesStore = TasksDomain.createStore<StatusNamesStore>(
	{
		ready: "Ready",
		inProgress: "In Progress",
		needReview: "Review",
		done: "Done",
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

/* TODO: Сделать валидацию запуска эффектов по их параметрам(чтобы два одинаковых не летели одновременно) */
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
export const editTaskFx = TasksDomain.createEffect<
	EditTaskRequest,
	CreateTaskResponse
>("editTasksFx");
export const deleteTaskFx = TasksDomain.createEffect<
	number,
	DeleteTaskResponse
>("deleteTaskFx");

export const loadTasks = TasksDomain.createEvent("loadTasks");
export const loadTasksProgress = TasksDomain.createEvent("loadTasksProgress");
export const loadTaskGroups = TasksDomain.createEvent("loadTaskGroups");
export const createTask =
	TasksDomain.createEvent<TaskRequest>("createTaskEvent");
export const editTask =
	TasksDomain.createEvent<EditTaskRequest>("editTaskEvent");
export const deleteTask = TasksDomain.createEvent<number>("deleteTaskEvent");
