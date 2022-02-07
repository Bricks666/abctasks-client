import { forward, guard, sample } from "effector";
import {
	$LoadingTasks,
	$LoadingTasksProgress,
	$TaskGroups,
	$Tasks,
	$TasksProgress,
	loadTaskGroups,
	loadTaskGroupsFx,
	loadTasks,
	loadTasksFx,
	loadTasksProgress,
	loadTasksProgressFx,
} from ".";
import { getTaskGroups, getTasks, getTasksProgress } from "../../api";
import {
	toValidTask,
	toValidTaskGroup,
	toValidTaskProgress,
} from "../../utils";

loadTasksFx.use(getTasks);
loadTaskGroupsFx.use(getTaskGroups);
loadTasksProgressFx.use(getTasksProgress);

guard({
	clock: loadTasks,
	filter: sample({
		clock: loadTasksFx.pending,
		fn: (isLoading) => !isLoading,
	}),
	target: loadTasksFx,
});

sample({
	clock: loadTasksFx.doneData,
	fn: (response) => response.tasks.map(toValidTask),
	target: $Tasks,
});

forward({
	from: loadTasksFx.pending,
	to: $LoadingTasks,
});

guard({
	clock: loadTasksProgress,
	filter: sample({
		clock: loadTasksProgressFx.pending,
		fn: (isLoading) => !isLoading,
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

guard({
	clock: loadTaskGroups,
	filter: sample({
		clock: loadTaskGroupsFx.pending,
		fn: (isLoading) => !isLoading,
	}),
	target: loadTaskGroupsFx,
});

sample({
	clock: loadTaskGroupsFx.doneData,
	fn: (response) => response.groups.map(toValidTaskGroup),
	target: $TaskGroups,
});

forward({
	from: [loadTasksFx, loadTasksProgressFx],
	to: loadTaskGroups,
});
