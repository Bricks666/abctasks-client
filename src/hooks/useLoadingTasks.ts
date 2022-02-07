import { useStore } from "effector-react";
import { $LoadingTasks } from "../models/Tasks";

export const useLoadingTasks = (): boolean => {
	return useStore($LoadingTasks);
};
