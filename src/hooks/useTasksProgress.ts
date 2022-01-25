import { useEffect } from "react";
import { useStore } from "effector-react";
import {
	$TasksProgressWithGroups,
	loadTasksProgress,
} from "../models/TasksProgress";

export const useTasksProgress = () => {
	const tasksProgress = useStore($TasksProgressWithGroups);

	useEffect(() => {
		if (tasksProgress.length === 0) {
			loadTasksProgress();
		}
	}, [tasksProgress.length]);

	return tasksProgress;
};
