import { useEffect } from "react";
import { useStore } from "effector-react";
import { $TasksProgress, loadTasksProgress } from "@/models/Progress";

export const useTasksProgress = () => {
	const tasksProgress = useStore($TasksProgress);

	useEffect(() => {
		if (!tasksProgress.length) {
			loadTasksProgress();
		}
	}, [tasksProgress.length]);

	return tasksProgress;
};
