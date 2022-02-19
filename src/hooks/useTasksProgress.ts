import { useEffect } from "react";
import { useStore } from "effector-react";
import { $TasksProgressWithGroups, loadTasksProgress } from "../models/Tasks";

export const useTasksProgress = () => {
	const tasksProgress = useStore($TasksProgressWithGroups);

	useEffect(() => {
		loadTasksProgress();
	}, []);

	return tasksProgress;
};
