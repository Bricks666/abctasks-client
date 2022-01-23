import { useStoreMap } from "effector-react";
import { $TasksProgressStore } from "../models/TasksProgress";

export const useTasksProgressLoading = (): boolean => {
	return useStoreMap($TasksProgressStore, (state) => state.isLoading);
};
