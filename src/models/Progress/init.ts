import { getTasksProgressApi, subscribeChangeProgressApi } from "@/api";
import { forward, guard, sample } from "effector";
import {
	$LoadingTasksProgress,
	$TasksProgress,
	changeProgress,
	loadTasksProgress,
	loadTasksProgressFx,
	resetProgress,
	subscribeChangeProgress,
	subscribeChangeProgressFx,
} from ".";
import { mayStartFxHandler } from "../handlers";
import { changeProgressHandler } from "./handler";
import { toValidTaskProgress } from "./utils";

loadTasksProgressFx.use(getTasksProgressApi);
subscribeChangeProgressFx.use(async ({ closeRef, ...config }) => {
	closeRef.current = await subscribeChangeProgressApi(config);
});

guard({
	clock: loadTasksProgress,
	filter: mayStartFxHandler(loadTasksProgressFx.pending),
	target: loadTasksProgressFx,
});

sample({
	clock: loadTasksProgressFx.doneData,
	fn: (taskProgressServer) =>
		taskProgressServer.tasksProgress.map(toValidTaskProgress),
	target: $TasksProgress,
});

forward({
	from: loadTasksProgressFx.pending,
	to: $LoadingTasksProgress,
});

sample({
	clock: subscribeChangeProgress,
	fn: (data) => ({
		onChangeProgress: changeProgress,
		onError: () => subscribeChangeProgress(data),
		...data,
	}),
	target: subscribeChangeProgressFx,
});

sample({
	source: $TasksProgress,
	clock: changeProgress,
	fn: changeProgressHandler,
	target: $TasksProgress,
});

sample({
	clock: resetProgress,
	fn: () => [],
	target: $TasksProgress,
});
