import { TaskProgressResponse } from '@/interfaces/response';
import { TaskProgressStructure } from './types';

export const toValidTaskProgress = (
	taskProgress: TaskProgressResponse
): TaskProgressStructure => {
	return {
		groupId: taskProgress.groupId,
		totalCount: taskProgress.totalCount,
		completedCount: taskProgress.doneCount,
	};
};
