import {
	CreateTaskResponse,
	DeleteTaskResponse,
	TaskResponse,
} from "@/interfaces/response";
import { withoutNullValues } from "@/utils";
import { TaskStructure } from "../Tasks/types";
import { TaskProgressStructure } from "./types";

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

const changedGroup = (
	progress: TaskProgressStructure,
	prevGroup: number,
	nextGroup: number,
	isWasDone: boolean,
	isNowDone: boolean,
	flags: { isNewGroup: boolean }
) => {
	if (progress.groupId === prevGroup) {
		return progress.totalCount !== 1
			? {
					...progress,
					totalCount: progress.totalCount - 1,
					completedCount: progress.completedCount - +isWasDone,
			  }
			: null;
	}

	if (progress.groupId === nextGroup) {
		flags.isNewGroup = false;
		return {
			...progress,
			totalCount: progress.totalCount + 1,
			completedCount: progress.completedCount + +isNowDone,
		};
	}

	return progress;
};

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

	const groupChanged = prevGroup !== nextGroup;
	const statusChanged = prevStatus !== nextStatus;
	const isSameProgress = !groupChanged && !statusChanged;

	if (isSameProgress) {
		return state;
	}

	const isWasDone = prevStatus === "Done";
	const isNowDone = nextStatus === "Done";
	const flags = {
		isNewGroup: true,
	};

	const newProgresses = state.map((progress) => {
		if (!groupChanged && progress.groupId === nextGroup) {
			flags.isNewGroup = false;
			const different = isWasDone ? (isNowDone ? 0 : -1) : +isNowDone;
			return {
				...progress,
				completedCount: progress.completedCount + different,
			};
		} else {
			return changedGroup(
				progress,
				prevGroup,
				nextGroup,
				isWasDone,
				isNowDone,
				flags
			);
		}
	});

	if (flags.isNewGroup) {
		newProgresses.push({
			groupId: nextTask.groupId,
			completedCount: +isNowDone,
			totalCount: 1,
		});
	}

	return withoutNullValues(newProgresses);
};
