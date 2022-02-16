import { forward, guard, sample } from "effector";
import {
	$LoadingTasks,
	$LoadingTasksProgress,
	$TaskGroups,
	$Tasks,
	$TasksProgress,
	createTask,
	createTaskFx,
	editTask,
	editTaskFx,
	loadTaskGroups,
	loadTaskGroupsFx,
	loadTasks,
	loadTasksFx,
	loadTasksProgress,
	loadTasksProgressFx,
	TaskProgressStructure,
} from ".";
import {
	getTaskGroupsApi,
	getTasksApi,
	getTasksProgressApi,
	createTaskApi,
	editTaskApi,
} from "../../api";
import {
	toValidTask,
	toValidTaskGroup,
	toValidTaskProgress,
} from "../../utils";

loadTasksFx.use(getTasksApi);
loadTaskGroupsFx.use(getTaskGroupsApi);
loadTasksProgressFx.use(getTasksProgressApi);
createTaskFx.use(createTaskApi);
editTaskFx.use(editTaskApi);

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

guard({
	clock: createTask,
	filter: sample({
		clock: createTaskFx.pending,
		fn: (isLoading) => !isLoading,
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
	fn: (currentState, { task }) => {
		let thisGroupWas = false;
		const isDoneTask = task.status === "Done";

		const tasksProgress = currentState.map((progress) => {
			if (progress.groupId === task.groupId) {
				thisGroupWas = true;
				return {
					...progress,
					completedCount: progress.completedCount + +isDoneTask,
					totalCount: progress.totalCount + 1,
				};
			}
			return progress;
		});

		if (!thisGroupWas) {
			tasksProgress.push({
				groupId: task.groupId,
				completedCount: +isDoneTask,
				totalCount: 1,
			});
		}

		return tasksProgress;
	},
	target: $TasksProgress,
});

guard({
	clock: editTask,
	filter: sample({
		source: editTaskFx.pending,
		fn: (isLoading) => !isLoading,
	}),
	target: editTaskFx,
});

sample({
	source: $Tasks,
	clock: editTaskFx.doneData,
	fn: (tasks, { task }) => {
		const validTask = toValidTask(task);

		return tasks.map((task) => (task.id === validTask.id ? validTask : task));
	},
	target: $Tasks,
});

sample({
	source: [$TasksProgress, $Tasks],
	clock: editTaskFx.done,
	fn: ([state, tasks], { params, result }) => {
		const { id } = params;
		debugger;
		const prevTask = tasks.find((task) => task.id === id);
		if (!prevTask) {
			return state;
		}
		const { groupId: prevGroup, status: prevStatus } = prevTask;
		const { groupId: nextGroup, status: nextStatus } = result.task;
		if (prevGroup === nextGroup) {
			return state;
		}

		const isWasDone = prevStatus === "Done";
		const isNowDone = nextStatus === "Done";

		return state.map((progress) => {
			if (progress.groupId === prevGroup) {
				return {
					...progress,
					totalCount: progress.totalCount - 1,
					completedCount: progress.completedCount - +isWasDone,
				};
			}

			if (progress.groupId === nextGroup) {
				return {
					...progress,
					totalCount: progress.totalCount + 1,
					completedCount: progress.completedCount + +isNowDone,
				};
			}

			return progress;
		});
	},
	target: $TasksProgress,
});
