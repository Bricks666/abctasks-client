import { useStore } from "effector-react";
import { useEffect } from "react";
import { $TasksWidthGroups, loadTasks } from "../models/Tasks";

export const useTasksWithGroups = () => {
	const tasks = useStore($TasksWidthGroups);

	useEffect(() => {
		if (!tasks.length) {
			loadTasks();
		}
	}, [tasks.length]);

	return tasks;
};
