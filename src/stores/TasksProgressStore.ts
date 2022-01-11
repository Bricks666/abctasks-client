import { createEvent, createStore } from "effector";
import { TaskProgressStructure } from "../interfaces/structures";

interface TasksProgressStore {
	tasksProgress: TaskProgressStructure[];
	isLoading: boolean;
}

export const $TasksProgressStore = createStore<TasksProgressStore>(
	{ tasksProgress: [], isLoading: false },
	{
		name: "tasksProgress",
	}
);

export const setTasksProgress = createEvent<TaskProgressStructure[]>();
/* TODO: Избавиться от загрузок, чтобы перейти на реакции */
export const startLoadingTasksProgress = createEvent();
export const endLoadingTasksProgress = createEvent();

$TasksProgressStore
	.on(setTasksProgress, (state, tasksProgress) => {
		return {
			...state,
			tasksProgress,
		};
	})
	.on(startLoadingTasksProgress, (state) => {
		return {
			...state,
			isLoading: true,
		};
	})
	.on(endLoadingTasksProgress, (state) => {
		return {
			...state,
			isLoading: false,
		};
	});
