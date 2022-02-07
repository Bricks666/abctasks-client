import { useStore } from "effector-react";
import { $LoadingTasksProgress } from "../models/Tasks";

export const useTasksProgressLoading = (): boolean => {
	return useStore($LoadingTasksProgress);
};
