import { useEffect } from "react";
import { useStore } from "effector-react";
import {
	$TasksProgress,
	loadTasksProgressFx,
	TaskProgressStructure,
} from "../models/TasksProgress";

export const useTasksProgress = (): TaskProgressStructure[] => {
	const tasksProgress = useStore($TasksProgress);

	useEffect(() => {
		if (tasksProgress.length === 0) {
			loadTasksProgressFx();
		}
	}, [tasksProgress.length]);

	return tasksProgress;
};
