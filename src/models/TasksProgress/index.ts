import { combine, createEffect, createStore } from "effector-logger";
import { GroupStructure } from "../../interfaces/common";
import { TasksProgressResponse } from "../../interfaces/response";

export interface TaskProgressStructure {
	readonly group: GroupStructure;
	readonly completedCount: number;
	readonly totalCount: number;
}

export interface TasksProgressStore {
	readonly tasksProgress: TaskProgressStructure[];
	readonly isLoading: boolean;
}

export const $TasksProgress = createStore<TaskProgressStructure[]>([], {
	name: "TasksProgress",
});

export const loadTasksProgressFx = createEffect<void, TasksProgressResponse>(
	"loadTasksProgress"
);

export const $TasksProgressStore = combine<TasksProgressStore>({
	tasksProgress: $TasksProgress,
	isLoading: loadTasksProgressFx.pending,
});
