import { useStore } from "effector-react";
import { useEffect } from "react";
import { $GroupedByStatusTasksStore, loadTasks } from "@/models/Tasks/";

export const useTasks = () => {
	const tasks = useStore($GroupedByStatusTasksStore);

	useEffect(() => {
		loadTasks();
	}, []);

	return tasks;
};
