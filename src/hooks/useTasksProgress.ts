import { useEffect } from "react";
import { useStore } from "effector-react";
import {
	$TasksProgress,
	loadTasksProgress,
	subscribeChangeProgress,
} from "@/models/Progress";

export const useTasksProgress = () => {
	const tasksProgress = useStore($TasksProgress);

	useEffect(() => {
		loadTasksProgress();
		subscribeChangeProgress();
	}, []);

	return tasksProgress;
};
