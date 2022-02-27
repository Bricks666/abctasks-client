import { useStore } from "effector-react";
import { $LoadingTasksProgress } from "../models/Progress";

export const useTasksProgressLoading = (): boolean => {
	return useStore($LoadingTasksProgress);
};
