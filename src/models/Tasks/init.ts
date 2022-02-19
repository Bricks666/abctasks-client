import { forward, guard, sample } from "effector";
import {
	$LoadingTasks,
	$LoadingTasksProgress,
	$TaskGroups,
	$Tasks,
	$TasksProgress,
	createTask,
	createTaskFx,
	deleteTask,
	deleteTaskFx,
	editTask,
	editTaskFx,
	loadTaskGroups,
	loadTaskGroupsFx,
	loadTasks,
	loadTasksFx,
	loadTasksProgress,
	loadTasksProgressFx,
	moveTask,
} from ".";
import {
	getTaskGroupsApi,
	getTasksApi,
	getTasksProgressApi,
	createTaskApi,
	editTaskApi,
	deleteTaskApi,
} from "@/api";
import { mayStartFxHandler } from "../handlers";
import {
	changeTaskProgressHandler,
	incrementTaskProgressHandler,
	editTaskHandler,
	deleteTaskProgressHandler,
} from "./handlers";
import { toValidTask, toValidTaskGroup, toValidTaskProgress } from "./utils";

loadTasksFx.use(getTasksApi);
loadTaskGroupsFx.use(getTaskGroupsApi);
loadTasksProgressFx.use(getTasksProgressApi);
createTaskFx.use(createTaskApi);
editTaskFx.use(editTaskApi);
deleteTaskFx.use(deleteTaskApi);

guard({
	clock: loadTasks,
	filter: sample({
		clock: loadTasksFx.pending,
		fn: mayStartFxHandler,
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

guard({
	clock: loadTaskGroups,
	filter: sample({
		clock: loadTaskGroupsFx.pending,
		fn: mayStartFxHandler,
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

guard({
	clock: createTask,
	filter: sample({
		clock: createTaskFx.pending,
		fn: mayStartFxHandler,
	}),
	target: createTaskFx,
});

sample({
	source: $Tasks,
	clock: createTaskFx.doneData,
	fn: (tasks, response) => [...tasks, toValidTask(response.task)],
	target: $Tasks,
});

sample({
	source: $TasksProgress,
	clock: createTaskFx.doneData,
	fn: incrementTaskProgressHandler,
	target: $TasksProgress,
});

guard({
	clock: editTask,
	filter: sample({
		source: editTaskFx.pending,
		fn: mayStartFxHandler,
	}),
	target: editTaskFx,
});

sample({
	source: $Tasks,
	clock: editTaskFx.doneData,
	fn: editTaskHandler,
	target: $Tasks,
});

sample({
	source: [$TasksProgress, $Tasks],
	clock: editTaskFx.doneData,
	fn: changeTaskProgressHandler,
	target: $TasksProgress,
});

guard({
	clock: deleteTask,
	filter: sample({
		source: deleteTaskFx.pending,
		fn: mayStartFxHandler,
	}),
	target: deleteTaskFx,
});

sample({
	source: $Tasks,
	clock: deleteTaskFx.doneData,
	fn: (tasks, { taskId }) => {
		return tasks.filter((task) => task.id !== taskId);
	},
	target: $Tasks,
});

sample({
	source: [$Tasks, $TasksProgress],
	clock: deleteTaskFx.doneData,
	fn: deleteTaskProgressHandler,
	target: $TasksProgress,
});

sample({
	source: $Tasks,
	clock: moveTask,
	fn: (tasks, { status, taskId }) => {
		const task = tasks.find((task) => task.id === taskId);
		if (!task) {
			throw new Error();
		}

		return {
			status,
			id: taskId,
			groupId: task.groupId,
			content: task.content,
		};
	},
	target: editTask,
});
