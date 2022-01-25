import { TaskProgressResponse } from "../interfaces/response";
import { TaskProgressStructure } from "../models/TasksProgress";

export const toValidTaskProgress = (
	taskProgress: TaskProgressResponse
): TaskProgressStructure => {
	return {
		group: {
			group: taskProgress.groupName,
			backgroundColor: taskProgress.groupSecondColor,
			textColor: taskProgress.groupMainColor,
		},
		totalCount: taskProgress.totalCount,
		completedCount: taskProgress.doneCount,
	};
};
