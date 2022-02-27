import { $GroupedByStatusTasksStore, loadTasks } from "@/models/Tasks";
import { useStore } from "effector-react";
import { useEffect } from "react";

export const useGroupedTasks = () => {
	const tasks = useStore($GroupedByStatusTasksStore);

	useEffect(() => {
		loadTasks();
	}, []);

	return tasks;
};
