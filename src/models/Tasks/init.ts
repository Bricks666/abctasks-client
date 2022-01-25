import { guard, sample } from "effector";
import { $Tasks, loadTasks, loadTasksFx, $MayLoadTasks } from ".";
import { getTasks } from "../../api";
import { toValidTask } from "../../utils";

loadTasksFx.use(getTasks);

guard({
	clock: loadTasks,
	filter: $MayLoadTasks,
	target: loadTasksFx,
});

sample({
	clock: loadTasksFx.doneData,
	fn: (response) => response.tasks.map(toValidTask),
	target: $Tasks,
});

sample({
	clock: loadTasksFx.pending,
	fn: (isWorking) => !isWorking,
	target: $MayLoadTasks,
});
