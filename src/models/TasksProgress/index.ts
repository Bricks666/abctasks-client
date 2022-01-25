import {
	combine,
	createEffect,
	createEvent,
	createStore,
} from "effector-logger";
import { TasksProgressResponse } from "../../interfaces/response";
import { TaskGroup, $TaskGroupsMap } from "../Group";

export interface TaskProgressStructure {
	readonly groupId: number;
	readonly completedCount: number;
	readonly totalCount: number;
}

export interface TaskProgressWithGroup
	extends Omit<TaskProgressStructure, "groupId">,
		TaskGroup {}

export interface TasksProgressStore {
	readonly tasksProgress: TaskProgressStructure[];
	readonly isLoading: boolean;
}

export const $TasksProgress = createStore<TaskProgressStructure[]>([], {
	name: "TasksProgress",
});

export const $TasksProgressWithGroups = combine(
	$TasksProgress,
	$TaskGroupsMap,
	(tasksProgress, groups) =>
		tasksProgress.map<TaskProgressWithGroup>((task) => {
			const group = groups[task.groupId];
			return {
				...group,
				totalCount: task.totalCount,
				completedCount: task.completedCount,
			};
		})
);

export const loadTasksProgress = createEvent("loadTasksProgress");

export const loadTasksProgressFx = createEffect<void, TasksProgressResponse>(
	"loadTasksProgress"
);

export const $TasksProgressStore = combine<TasksProgressStore>({
	tasksProgress: $TasksProgress,
	isLoading: loadTasksProgressFx.pending,
});

export const $MayLoadTaskProgress = createStore<boolean>(true, {
	name: "MayLoadTaskProgress",
});
