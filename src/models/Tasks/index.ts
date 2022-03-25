import { combine, createDomain } from "effector-logger";
import {
	TasksResponse,
	DeleteTaskResponse,
	CreateTaskResponse,
} from "@/interfaces/response";
import {
	DeleteTaskRequest,
	EditTaskRequest,
	MoveTaskRequest,
	TaskRequest,
} from "@/interfaces/requests";
import { GroupedByStatusTasksStore, TaskStatus, TaskStructure } from "./types";
import { ID } from "@/interfaces/common";

export const TasksDomain = createDomain("TasksDomain");

export const $Tasks = TasksDomain.store<TaskStructure[]>([], {
	name: "Tasks",
});
export const $LoadingTasks = TasksDomain.store<boolean>(false, {
	name: "LoadingTasks",
});

const createGrouper = (status: TaskStatus) => {
	return (state: TaskStructure[]) => {
		return state.filter((task) => task.status === status);
	};
};
/* Может не стоит комбинировать в один объект */
export const $GroupedByStatusTasksStore = combine<
	TaskStructure[],
	GroupedByStatusTasksStore
>($Tasks, (tasks) => ({
	done: createGrouper("Done")(tasks),
	inProgress: createGrouper("In Progress")(tasks),
	ready: createGrouper("Ready")(tasks),
	needReview: createGrouper("Review")(tasks),
}));

export const loadTasksFx = TasksDomain.effect<ID, TasksResponse>("loadTasksFx");

export const createTaskFx = TasksDomain.effect<TaskRequest, CreateTaskResponse>(
	"createTaskFx"
);
export const editTaskFx = TasksDomain.effect<
	EditTaskRequest,
	CreateTaskResponse
>("editTasksFx");
export const deleteTaskFx = TasksDomain.effect<
	DeleteTaskRequest,
	DeleteTaskResponse
>("deleteTaskFx");

export const loadTasks = TasksDomain.event<ID>("loadTasks");
export const createTask = TasksDomain.event<TaskRequest>("createTaskEvent");
export const editTask = TasksDomain.event<EditTaskRequest>("editTaskEvent");
export const deleteTask =
	TasksDomain.event<DeleteTaskRequest>("deleteTaskEvent");
export const moveTask = TasksDomain.event<MoveTaskRequest>("modeTaskEvent");
