import { useStoreMap } from "effector-react";
import { $TasksStore } from "../stores";

export const useLoadingTasks = (): boolean => {
	return useStoreMap($TasksStore, (state) => state.isLoading);
};
