import { sample, guard } from "effector";
import {
	$TasksProgress,
	loadTasksProgressFx,
	loadTasksProgress,
	$MayLoadTaskProgress,
} from ".";
import { getTasksProgress } from "../../api";
import { toValidTaskProgress } from "../../utils";

loadTasksProgressFx.use(getTasksProgress);

sample({
	clock: loadTasksProgressFx.doneData,
	fn: (taskProgressServer) =>
		taskProgressServer.tasksProgress.map(toValidTaskProgress),
	target: $TasksProgress,
});

guard({
	clock: loadTasksProgress,
	filter: $MayLoadTaskProgress,
	target: loadTasksProgressFx,
});

sample({
	clock: loadTasksProgressFx.pending,
	fn: (isLoading) => !isLoading,
	target: $MayLoadTaskProgress,
});
