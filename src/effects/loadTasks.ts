import { createEffect } from "effector";
import { getTasks } from "../api";
import {
	endLoadingTask,
	setTasks,
	startLoadingTask,
} from "../stores/TasksStore";

export const loadTasksFx = createEffect<void, void>(async () => {
	startLoadingTask();
	const response = await getTasks();
	setTasks(response);
	endLoadingTask();
});
