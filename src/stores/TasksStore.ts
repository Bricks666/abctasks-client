import { createEvent, createStore } from "effector";
import { TaskStructure } from "../interfaces/structures";

export interface TasksStore {
	tasks: TaskStructure[];
	isLoading: boolean;
}

export const $TasksStore = createStore<TasksStore>(
	{ tasks: [], isLoading: false },
	{ name: "TasksStore" }
);

export const setTasks = createEvent<TaskStructure[]>("setTasks");
export const addTask = createEvent<TaskStructure>("addTask");
export const changeTaskGroup =
	createEvent<{ taskID: number; newGroup: string }>("changeTaskStatus");
export const startLoadingTask = createEvent("startLoadingTask");
export const endLoadingTask = createEvent("endLoadingTask");

$TasksStore
	.on(setTasks, (state, tasks) => {
		return {
			...state,
			tasks,
		};
	})
	.on(addTask, (state, task) => {
		return {
			...state,
			tasks: [...state.tasks, task],
		};
	})
	.on(startLoadingTask, (state) => {
		return {
			...state,
			isLoading: true,
		};
	})
	.on(endLoadingTask, (state) => {
		return {
			...state,
			isLoading: false,
		};
	});
