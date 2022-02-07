import { TaskProgressResponse } from "../interfaces/response";
import { TaskProgressStructure } from "../models/Tasks";

export const toValidTaskProgress = (
	taskProgress: TaskProgressResponse
): TaskProgressStructure => {
	return {
		groupId: taskProgress.groupId,
		totalCount: taskProgress.totalCount,
		completedCount: taskProgress.doneCount,
	};
};
