import { useStore } from "effector-react";
import { useEffect } from "react";
import { $Tasks, loadTasks } from "@/models/Tasks/";

export const useTasks = () => {
	const tasks = useStore($Tasks);

	useEffect(() => {
		if (!tasks.length) {
			loadTasks();
		}
	}, [tasks.length]);

	return tasks;
};
