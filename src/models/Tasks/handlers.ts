import {
	CreateTaskResponse,
	DeleteTaskResponse,
	TaskResponse,
} from "@/interfaces/response";
import { withoutNullValues } from "@/utils";
import { TaskProgressStructure, TaskStructure } from "./types";
import { toValidTask } from "./utils";

export const changeTaskProgressHandler = (
	[state, tasks]: [TaskProgressStructure[], TaskStructure[]],
	{ task: nextTask }: CreateTaskResponse
) => {
	const prevTask = tasks.find((task) => task.id === nextTask.todoId);

	if (!prevTask) {
		return state;
	}
	const { groupId: prevGroup, status: prevStatus } = prevTask;
	const { groupId: nextGroup, status: nextStatus } = nextTask;

	const isSameProgress = prevGroup === nextGroup && prevStatus === nextStatus;
	if (isSameProgress) {
		return state;
	}

	const isWasDone = prevStatus === "Done";
	const isNowDone = nextStatus === "Done";
	let isNewGroup = true;

	const progresses = state.map((progress) => {
		if (progress.groupId === prevGroup) {
			if (progress.totalCount === 1) {
				return null;
			}
			return {
				...progress,
				totalCount: progress.totalCount - 1,
				completedCount: progress.completedCount - +isWasDone,
			};
		}

		if (progress.groupId === nextGroup) {
			isNewGroup = false;
			return {
				...progress,
				totalCount: progress.totalCount + 1,
				completedCount: progress.completedCount + +isNowDone,
			};
		}

		return progress;
	});

	if (isNewGroup) {
		progresses.push({
			groupId: nextTask.groupId,
			completedCount: +isNowDone,
			totalCount: 1,
		});
	}

	return withoutNullValues(progresses);
};

export const incrementTaskProgressHandler = (
	state: TaskProgressStructure[],
	{ task }: { task: TaskResponse }
) => {
	let isNewGroup = true;
	const isDoneTask = task.status === "Done";

	const tasksProgress = state.map((progress) => {
		if (progress.groupId === task.groupId) {
			isNewGroup = false;
			return {
				...progress,
				completedCount: progress.completedCount + +isDoneTask,
				totalCount: progress.totalCount + 1,
			};
		}
		return progress;
	});

	if (isNewGroup) {
		tasksProgress.push({
			groupId: task.groupId,
			completedCount: +isDoneTask,
			totalCount: 1,
		});
	}

	return tasksProgress;
};

export const editTaskHandler = (
	tasks: TaskStructure[],
	{ task }: { task: TaskResponse }
) => {
	const validTask = toValidTask(task);

	return tasks.map((task) => (task.id === validTask.id ? validTask : task));
};

export const deleteTaskProgressHandler = (
	[tasks, progress]: [TaskStructure[], TaskProgressStructure[]],
	{ taskId }: DeleteTaskResponse
) => {
	const deletedTask = tasks.find((task) => task.id === taskId);

	if (!deletedTask) {
		return progress;
	}

	const { groupId, status } = deletedTask;
	const wasDone = status === "Done";

	const taskProgresses = progress.map((progress) => {
		if (progress.groupId === groupId) {
			if (progress.totalCount === 1) {
				return null;
			}

			return {
				...progress,
				totalCount: progress.totalCount - 1,
				completedCount: progress.completedCount - +wasDone,
			};
		}
		return progress;
	});

	return withoutNullValues(taskProgresses);
};
