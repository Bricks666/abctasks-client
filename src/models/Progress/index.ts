import { TasksProgressResponse } from "@/interfaces/response";
import { createDomain } from "effector-logger";
import { TaskProgressStructure } from "./types";

export const ProgressDomain = createDomain("ProgressDomain");

/* TODO: Сделать обновление прогресса по событиям на сервере */

export const $TasksProgress = ProgressDomain.createStore<
	TaskProgressStructure[]
>([], {
	name: "TasksProgress",
});
export const $LoadingTasksProgress = ProgressDomain.createStore<boolean>(
	false,
	{
		name: "LoadingTasksProgress",
	}
);

export const loadTasksProgressFx = ProgressDomain.createEffect<
	void,
	TasksProgressResponse
>("loadTasksProgress");
export const loadTasksProgress =
	ProgressDomain.createEvent("loadTasksProgress");
