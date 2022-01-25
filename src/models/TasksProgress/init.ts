import { sample } from "effector";
import { $TasksProgress, loadTasksProgressFx } from ".";
import { getTasksProgress } from "../../api";
import { toValidTaskProgress } from "../../utils";

loadTasksProgressFx.use(getTasksProgress);

sample({
	clock: loadTasksProgressFx.doneData,
	fn: (taskProgressServer) =>
		taskProgressServer.tasksProgress.map(toValidTaskProgress),
	target: $TasksProgress,
});
