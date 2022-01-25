import { sample } from "effector";
import { $Tasks, addTask, changeTaskGroup, loadTasksFx } from ".";
import { getTasks } from "../../api";
import { toValidTask } from "../../utils";

loadTasksFx.use(getTasks);

$Tasks
	.on(addTask, (state, task) => [...state, task])
	.on(changeTaskGroup, (state, changes) =>
		state.map((task) =>
			task.id === changes.taskID ? { ...task, group: changes.newGroup } : task
		)
	);

sample({
	clock: loadTasksFx.doneData,
	fn: (response) => response.tasks.map(toValidTask),
	target: $Tasks,
});
