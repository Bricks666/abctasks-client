import { useStore } from "effector-react";
import { useEffect } from "react";
import {
	$GroupedByStatusTasksStore,
	GroupedByStatusTasksStore,
	loadTasks,
} from "../models/Tasks/";

export const useTasks = (): GroupedByStatusTasksStore => {
	const tasks = useStore($GroupedByStatusTasksStore);

	useEffect(() => {
		loadTasks();
	}, []);

	return tasks;
};
