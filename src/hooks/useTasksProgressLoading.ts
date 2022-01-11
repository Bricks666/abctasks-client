import { useStoreMap } from "effector-react";
import { $TasksProgressStore } from "../stores";

export const useTasksProgressLoading = (): boolean => {
	return useStoreMap($TasksProgressStore, (state) => state.isLoading);
};
