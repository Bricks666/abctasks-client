import { combine, createDomain } from "effector-logger";
import { TasksResponse, DeleteTaskResponse } from "@/interfaces/response";
import {
	EditTaskRequest,
	MoveTaskRequest,
	TaskRequest,
} from "@/interfaces/requests";
import { CreateTaskResponse } from "@/interfaces/response/CreateTaskResponse";
import {
	GroupedByStatusTasksStore,
	StatusNamesStore,
	TaskStatus,
	TaskStructure,
} from "./types";

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

/* TODO: Сделать валидацию запуска эффектов по их параметрам(чтобы два одинаковых не летели одновременно) */
export const loadTasksFx = TasksDomain.createEffect<void, TasksResponse>(
	"loadTasksFx"
);

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
export const createTask =
	TasksDomain.createEvent<TaskRequest>("createTaskEvent");
export const editTask =
	TasksDomain.createEvent<EditTaskRequest>("editTaskEvent");
export const deleteTask = TasksDomain.createEvent<number>("deleteTaskEvent");
export const moveTask =
	TasksDomain.createEvent<MoveTaskRequest>("modeTaskEvent");
