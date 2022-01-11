import { createEffect } from "effector";
import { getTasksProgress } from "../api";
import {
	endLoadingTasksProgress,
	setTasksProgress,
	startLoadingTasksProgress,
} from "../stores/TasksProgressStore";

export const loadTasksProgressFx = createEffect<void, void>(async () => {
	try {
		startLoadingTasksProgress();
		const response = await getTasksProgress();
		setTasksProgress(response);
		endLoadingTasksProgress();
	} catch (e) {
		console.log(e);
	}
});
