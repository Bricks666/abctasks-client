import { $Tasks, addTask, changeTaskGroup, loadTasksFx } from ".";
import { getTasks } from "../../api";

loadTasksFx.use(getTasks);

$Tasks
	.on(loadTasksFx.doneData, (_, tasks) => tasks)
	.on(addTask, (state, task) => [...state, task])
	.on(changeTaskGroup, (state, changes) =>
		state.map((task) =>
			task.id === changes.taskID ? { ...task, group: changes.newGroup } : task
		)
	);
