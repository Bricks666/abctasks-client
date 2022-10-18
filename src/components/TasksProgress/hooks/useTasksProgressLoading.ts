import { useStore } from 'effector-react';
import { $LoadingTasksProgress } from '@/models/progress';

export const useTasksProgressLoading = (): boolean => {
	return useStore($LoadingTasksProgress);
};
