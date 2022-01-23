import { useStoreMap } from "effector-react";
import { $TasksStore } from "../models/Tasks";

export const useLoadingTasks = (): boolean => {
	return useStoreMap($TasksStore, (state) => state.isLoading);
};
