import { getTasksProgressApi } from "@/api";
import { forward, guard, sample } from "effector";
import {
	$LoadingTasksProgress,
	$TasksProgress,
	loadTasksProgress,
	loadTasksProgressFx,
} from ".";
import { mayStartFxHandler } from "../handlers";
import { $Tasks, createTaskFx, deleteTaskFx, editTaskFx } from "../Tasks";
import {
	changeTaskProgressHandler,
	deleteTaskProgressHandler,
	incrementTaskProgressHandler,
} from "./handler";
import { toValidTaskProgress } from "./utils";

loadTasksProgressFx.use(getTasksProgressApi);

guard({
	clock: loadTasksProgress,
	filter: sample({
		clock: loadTasksProgressFx.pending,
		fn: mayStartFxHandler,
	}),
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
	source: $TasksProgress,
	clock: createTaskFx.doneData,
	fn: incrementTaskProgressHandler,
	target: $TasksProgress,
});

sample({
	source: [$TasksProgress, $Tasks],
	clock: editTaskFx.doneData,
	fn: changeTaskProgressHandler,
	target: $TasksProgress,
});
sample({
	source: [$Tasks, $TasksProgress],
	clock: deleteTaskFx.doneData,
	fn: deleteTaskProgressHandler,
	target: $TasksProgress,
});
