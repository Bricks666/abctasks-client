import { $TasksProgress, loadTasksProgressFx } from ".";
import { getTasksProgress } from "../../api";

loadTasksProgressFx.use(getTasksProgress);

$TasksProgress.on(
	loadTasksProgressFx.doneData,
	(_, tasksProgress) => tasksProgress
);
