import { combine, createEffect, createStore } from "effector-logger";
import { HEX } from "../../interfaces/common";

export interface GroupStructure {
	group: string;
	textColor: HEX;
	backgroundColor: HEX;
}

export interface TaskProgressStructure {
	id: number;
	group: GroupStructure;
	completedCount: number;
	totalCount: number;
}

export interface TasksProgressStore {
	tasksProgress: TaskProgressStructure[];
	isLoading: boolean;
}

export const $TasksProgress = createStore<TaskProgressStructure[]>([], {
	name: "TasksProgress",
});

export const loadTasksProgressFx = createEffect<void, TaskProgressStructure[]>(
	"loadTasksProgress"
);

export const $TasksProgressStore = combine<TasksProgressStore>({
	tasksProgress: $TasksProgress,
	isLoading: loadTasksProgressFx.pending,
});
